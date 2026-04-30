/**
 * Middleware pour capturer et formater les erreurs de manière centralisée.
 * Pour /api/projects et /api/testimonies, renvoie TOUJOURS un tableau vide
 * afin d'éviter "TypeError: projects.filter is not a function" côté front.
 * @param {Error} err - Erreur capturée
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur :', err.message);

  // Pour les routes qui doivent retourner un tableau (projects/testimonies)
  if (req.path.startsWith('/api/projects') || req.path.startsWith('/api/testimonies')) {
    res.status(err.status || 500).json([]); // Tableau vide
  } else {
    // Pour les autres routes, renvoie un objet avec le message d'erreur
    res.status(err.status || 500).json({
      message: err.message || 'Une erreur est survenue sur le serveur',
    });
  }
};

export default errorHandler;