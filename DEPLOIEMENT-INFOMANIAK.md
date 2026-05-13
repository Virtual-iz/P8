# Guide de déploiement — Infomaniak

> **Prérequis** : vous possédez le nom de domaine `virtual-iz.fr` et un hébergement Infomaniak Starter.

---

## Ce que vous devez savoir d'abord

Ce projet a deux parties :

| Partie | Ce que c'est | Besoin d'hébergement |
|--------|-------------|----------------------|
| **Frontend** | Site React compilé = fichiers statiques (HTML, CSS, JS) | ✅ Compatible hébergement Starter |
| **Backend** | Serveur Node.js (API) | ⚠️ Nécessite support Node.js |

**L'hébergement Starter d'Infomaniak** supporte les fichiers statiques (votre site sera visible), mais **le support Node.js dépend de votre plan spécifique**. Vérifiez dans votre Manager Infomaniak si l'option Node.js est disponible. Si ce n'est pas le cas, deux options :
- Passer à un plan supérieur chez Infomaniak (Cloud Hosting ou VPS)
- Héberger le backend gratuitement sur un service externe comme **Railway** ou **Render** (voir Option B)

---

## Étape 1 — Construire le frontend (vite build)

Jusqu'ici vous avez travaillé en mode développement (`npm run dev`). Ce mode démarre un serveur local qui compile votre code à la volée. Il n'est **pas utilisable en production** (trop lent, non sécurisé).

`vite build` crée une version optimisée et compressée de votre site, prête à être mise en ligne.

```bash
cd frontend
npm run build
```

Cela génère un dossier `frontend/dist/` contenant :
```
dist/
├── index.html          ← la page principale
├── assets/
│   ├── index-[hash].js     ← tout le JavaScript, minifié
│   ├── index-[hash].css    ← tout le CSS, minifié
│   └── *.webp / *.svg      ← images optimisées
└── profil-pic-virtualiz.webp, favicon.png, etc.
```

**Pour vérifier que le build fonctionne avant de le mettre en ligne :**
```bash
npm run preview
```
Cela ouvre votre site compilé sur `http://localhost:4173`. C'est ce que verront vos visiteurs.

### Erreur possible : `manualChunks is not a function`

Si le build échoue avec cette erreur, c'est une incompatibilité entre la syntaxe objet de `manualChunks` et Vite 8+ (qui utilise Rolldown). La forme objet n'est plus acceptée — il faut la forme fonction dans `vite.config.js` :

```js
// ❌ Vite ≤ 7 (plus supporté)
manualChunks: { 'vendor-react': ['react', 'react-dom'] }

// ✅ Vite 8+
manualChunks: (id) => {
  if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
    return 'vendor-react';
  }
}
```

---

## Étape 2 — Préparer les variables d'environnement du frontend

Vite charge automatiquement les fichiers `.env` selon le contexte :

| Fichier | Chargé quand | Contient |
|---------|-------------|----------|
| `frontend/.env` | `npm run dev` uniquement | URLs localhost (`http://localhost:3001/...`) |
| `frontend/.env.production` | `npm run build` uniquement | URLs de production (`https://virtual-iz.fr/...`) |

Concrètement : quand vous lancez `npm run build`, Vite lit `.env.production` et compile les bonnes URLs directement dans les fichiers JS du `dist/`. Vous n'avez pas à toucher au code — le switch dev/prod est automatique.

Le fichier `frontend/.env.production` est déjà configuré avec votre domaine (`virtual-iz.fr`). Vous n'avez rien à modifier.

---

## Étape 3 — Déployer le frontend sur Infomaniak

### 3.1 — Connexion FTP/SFTP

Dans votre Manager Infomaniak :
1. Allez dans **Hébergement Web** → votre hébergement
2. Section **FTP** → notez l'hôte, le login et le mot de passe FTP
3. Ouvrez un client FTP (FileZilla, Cyberduck, ou WinSCP)
4. Connectez-vous à votre hébergement

### 3.2 — Upload des fichiers

- Naviguez dans le dossier racine de votre hébergement (généralement `public_html/` ou `web/`)
- **Supprimez les éventuels fichiers existants** (si c'est un nouveau déploiement)
- Uploadez **tout le contenu du dossier `frontend/dist/`** (pas le dossier lui-même, son contenu)

Résultat sur le serveur :
```
public_html/
├── index.html
├── assets/
│   └── ...
├── profil-pic-virtualiz.webp
└── ...
```

### 3.3 — Configurer la redirection SPA (obligatoire)

Le site est une SPA (Single Page Application) : il n'a qu'une seule vraie page (`index.html`). Le serveur doit renvoyer cette page pour toutes les URLs.

Créez un fichier `.htaccess` à la racine de votre hébergement (`public_html/.htaccess`) avec ce contenu :

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

Ce fichier dit au serveur Apache : "si le fichier demandé n'existe pas, renvoie index.html".

---

## Étape 4 — Déployer le backend Node.js

### Option A — Sur Infomaniak (si Node.js est disponible sur votre plan)

1. Dans le Manager Infomaniak, cherchez la section **Node.js** ou **Applications web**
2. Créez une nouvelle application Node.js :
   - Répertoire : dossier dédié (ex: `backend/`)
   - Fichier de démarrage : `server.js`
   - Version Node.js : 18 ou supérieure
3. Uploadez tout le dossier `backend/` via FTP **sauf** `node_modules/`
4. Via SSH ou le terminal Infomaniak, installez les dépendances :
   ```bash
   cd backend
   npm install --production
   ```
5. Créez le fichier `backend/.env` **directement sur le serveur** (ne jamais l'uploader via git) :
   ```env
   PORT=3001
   ADMIN_ID=votre_identifiant
   ADMIN_PASSWORD=votre_mot_de_passe
   JWT_SECRET=une_longue_chaine_aleatoire_unique  ← générez-la avec la commande ci-dessous
   SMTP_HOST=mail.infomaniak.com
   SMTP_PORT=587
   SMTP_USER=contact@virtual-iz.fr
   SMTP_PASS=votre_mot_de_passe_smtp
   CONTACT_EMAIL=contact@virtual-iz.fr
   ```

   **Générer le JWT_SECRET** — dans un terminal (Node.js requis) :
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Copiez la chaîne générée (128 caractères) comme valeur de `JWT_SECRET`.

6. Démarrez l'application via l'interface Infomaniak ou :
   ```bash
   npm start
   ```

### Option B — Backend sur Railway (gratuit, simple)

Si votre plan Infomaniak ne supporte pas Node.js, hébergez le backend séparément :

1. Créez un compte sur [railway.app](https://railway.app)
2. Créez un nouveau projet → **"Deploy from GitHub repo"**
3. Pointez sur votre repo, dossier `backend/`
4. Dans les **Variables d'environnement** de Railway, ajoutez toutes les variables du `.env`
5. Railway vous donne une URL du type `https://votre-projet.railway.app`
6. **Mettez à jour `frontend/.env.production`** avec cette URL :
   ```env
   VITE_API_URL=https://votre-projet.railway.app/api
   VITE_IMG_URL=https://votre-projet.railway.app/img
   ```
7. Relancez `npm run build` dans le frontend et re-uploadez le contenu de `dist/`

---

## Étape 5 — Créer les dossiers de données sur le serveur

Le backend a besoin de ces dossiers/fichiers sur le serveur (non commités) :

```bash
# Sur le serveur, dans le dossier backend/
mkdir -p img
mkdir -p datas
```

Uploadez également via FTP :
- `backend/datas/projects.json` → vos projets actuels
- `backend/datas/testimonies.json` → vos témoignages actuels
- `backend/img/` → toutes les images de projets existantes

---

## Étape 6 — Configurer le domaine

Dans le Manager Infomaniak :
1. Allez dans **Domaines** → `virtual-iz.fr`
2. Vérifiez que le domaine pointe bien vers votre hébergement
3. Activez le **certificat SSL gratuit Let's Encrypt** (section SSL/HTTPS)
4. Activez la **redirection HTTP → HTTPS** (obligatoire)

---

## Étape 7 — Configurer l'email (SMTP Infomaniak)

1. Dans le Manager Infomaniak, créez une adresse email : `contact@virtual-iz.fr`
2. Récupérez les paramètres SMTP Infomaniak :
   - Hôte : `mail.infomaniak.com`
   - Port : `587` (STARTTLS)
3. Renseignez ces valeurs dans `backend/.env` sur le serveur

---

## Récapitulatif des commandes importantes

```bash
# Développement local
cd frontend && npm run dev          # Frontend : http://localhost:5173
cd backend  && npm run dev          # Backend  : http://localhost:3001

# Avant chaque déploiement
cd frontend && npm run build        # Génère frontend/dist/
cd frontend && npm run preview      # Vérifie le build : http://localhost:4173

# Sur le serveur
cd backend  && npm install --production
cd backend  && npm start
```

---

## Checklist de déploiement

- [ ] `npm run build` exécuté sans erreur
- [ ] `npm run preview` vérifié localement
- [ ] Contenu de `dist/` uploadé sur l'hébergement
- [ ] Fichier `.htaccess` créé sur l'hébergement
- [ ] `backend/.env` créé **sur le serveur** (jamais via git)
- [ ] `backend/datas/` et `backend/img/` présents sur le serveur
- [ ] Dossier `backend/node_modules/` absent de l'upload (lourd, inutile)
- [ ] Certificat SSL activé
- [ ] Redirection HTTP → HTTPS activée
- [ ] Test du formulaire de contact en production
- [ ] Test de connexion admin en production
