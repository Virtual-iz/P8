/**
 * Point d'entrée du serveur backend.
 * Lance l'application Express sur le port défini dans .env (ou 3001 par défaut).
 */
import app from './app.js';

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});