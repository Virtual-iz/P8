# VirtualIZ — Portfolio

Portfolio professionnel full-stack : développement web, design graphique, photographie.  
Site : **https://virtual-iz.fr**

---

## Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | React 19, Vite 8, SCSS (modules) |
| Backend | Node.js, Express 5 |
| Données | JSON (fichiers plats) + images WebP |
| Auth | JWT (jsonwebtoken), rate-limiting |
| Email | Nodemailer (SMTP) |
| Uploads | Multer + Sharp (conversion WebP automatique) |

---

## Arborescence

```
virtualiz/
├── .gitignore                     # gitignore racine (commun)
├── README.md
│
├── frontend/                      # Application React (Vite)
│   ├── .env                       # Variables dev (non committé)
│   ├── .env.production            # Variables prod (committé — URLs seulement)
│   ├── index.html                 # Shell HTML, meta SEO, preload LCP
│   ├── vite.config.js             # Config Vite (build, chunks)
│   ├── package.json
│   └── src/
│       ├── App.jsx                # Router React (route unique "/")
│       ├── App.scss               # Styles globaux, variables CSS, typographie
│       ├── config.js              # API_URL et IMG_URL (depuis .env)
│       ├── main.jsx               # Point d'entrée React
│       ├── assets/
│       │   └── img/               # Images sources (non servies directement)
│       ├── pages/
│       │   └── Home.jsx           # Accueil
│       ├── sections/              # Sections
│       │   ├── header/            # Hero Header
│       │   ├── navbar/            # Navigation
│       │   ├── about/             # Présentation
│       │   ├── services/          # Compétences
│       │   ├── process/           # Étapes+clients
│       │   ├── portfolio/         # Galerie projets
│       │   ├── contact/           # Contact form
│       │   └── footer/            # Footer
│       ├── components/
│       │   ├── adminlogin/        # Modale connex
│       │   ├── adminmodal/        # Modale éditeur
│       │   ├── bubble/            # Bulle crantée
│       │   ├── btn/               # Boutons 
│       │   ├── carrousel/         # Slider projet
│       │   ├── filters/           # Filtres
│       │   ├── form/              # formulaire
│       │   ├── logo/              # Logo Virtualiz
│       │   ├── percent/           # % animés
│       │   ├── projectcard/       # Aperçu projet
│       │   ├── projectmodal/      # Modale projet
│       │   ├── projectsgallery/   # Galerie projet
│       │   ├── smallslider/       # Carrousel de témoignages
│       │   ├── tag/               # Tag techno
│       │   └── testimony/         # Témoignage 
│       └── public/
│           ├── favicon.png
│           ├── og-card-virtualiz.png     # Open Graph
│           ├── profil-pic-virtualiz.webp # Photo LCP (préchargée dans index.html)
│           ├── virtualiz-cv.pdf          # CV téléchargeable
│           ├── virtualiz-initiales.png   # Logo initiales
│           ├── virtualiz-nom.png         # Logo nom
│           ├── robots.txt
│           └── sitemap.xml
│
└── backend/                       # API Express
    ├── .env                       # Secrets (non committé — voir section Variables)
    ├── app.js                     # Config Express : CORS, Helmet, rate-limit, routes
    ├── server.js                  # Lancement du serveur (port .env ou 3001)
    ├── package.json
    ├── controllers/
    │   ├── authController.js      # Vérification identifiants + génération JWT
    │   ├── contactController.js   # Envoi email via Nodemailer SMTP
    │   └── testimoniesController.js # Lecture des témoignages JSON
    ├── routes/
    │   ├── auth.js                # POST /api/auth/login
    │   ├── contact.js             # POST /api/contact
    │   ├── projects.js            # CRUD /api/projects (POST/PUT protégés par JWT)
    │   └── testimonies.js         # GET /api/testimonies
    ├── middleware/
    │   ├── auth.js                # Vérifie le token JWT Bearer
    │   ├── errorHandler.js        # Gestion centralisée des erreurs Express
    │   └── upload.js              # Multer (5 Mo/fichier, 10 fichiers max, images only)
    ├── datas/
    │   ├── projects.json          # Données des projets du portfolio
    │   └── testimonies.json       # Témoignages clients
    └── img/                       # Images projets uploadées (non commité)
```

---

## Variables d'environnement

### Backend — `backend/.env` (ne jamais committer)

```env
PORT=3001

# Auth admin
ADMIN_ID=votre_identifiant
ADMIN_PASSWORD=votre_mot_de_passe_fort
JWT_SECRET=une_chaine_aleatoire_longue_et_complexe

# SMTP (Infomaniak Mail ou autre)
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=587
SMTP_USER=contact@contact.fr
SMTP_PASS=votre_mot_de_passe_smtp

# Destinataire des messages de contact
CONTACT_EMAIL=contact@contact.fr
```

### Frontend — `frontend/.env` (dev uniquement, non committé)

```env
VITE_API_URL=http://localhost:3001/api
VITE_IMG_URL=http://localhost:3001/img
```

`frontend/.env.production` est committé et contient les URLs de production.

---

## Lancer le projet en développement

```bash
# 1. Backend
cd backend
npm install
# créer backend/.env (voir section Variables)
npm run dev          # nodemon, port 3001

# 2. Frontend (autre terminal)
cd frontend
npm install
npm run dev          # Vite, port 5173 — ouvre automatiquement le navigateur
```

---

## Sécurité

| Mécanisme | Détail |
|-----------|--------|
| Auth admin | JWT signé (2h), secret en `.env` |
| Bruteforce | Rate-limit 10 tentatives / 15 min sur `/api/auth` |
| Spam contact | Rate-limit 5 messages / heure sur `/api/contact` |
| Uploads | MIME check, 5 Mo max, 10 fichiers max |
| CORS | Origines explicitement listées (`virtual-iz.fr`, `localhost:5173`) |
| Headers HTTP | Helmet (CSP, X-Frame-Options, etc.) |
| Validation URL | Regex `http/https` sur les champs démo/github |
| Ordre middleware | `auth` vérifié AVANT `multer` (aucun fichier écrit sans token valide) |

---

## Données — Format JSON

### `projects.json`

```json
[
  {
    "id": "1715000000000-1234",
    "title": "Nom du projet",
    "p1": "Description courte",
    "cover": "image-principale.webp",
    "demo": "https://...",
    "github": "https://github.com/...",
    "pictures": ["img1.webp", "img2.webp"],
    "filtres": ["front", "back"],
    "tags": ["React", "Node.js"],
    "title2": "Objectifs", "p2": ["..."],
    "title3": "Défis",     "p3": ["..."],
    "title4": "Solutions", "p4": ["..."]
  }
]
```

### `testimonies.json`

```json
[
  {
    "name": "Prénom Nom",
    "role": "Titre — Entreprise",
    "text": "Témoignage..."
  }
]
```

---

## Notes importantes

- Les images uploadées via l'admin sont **automatiquement converties en WebP** (qualité 80%) par Sharp côté backend.
- `backend/img/` n'est pas commité (gitignore). À sauvegarder manuellement lors d'un déploiement.
- Le frontend est un SPA : le serveur doit rediriger toutes les routes vers `index.html` 
