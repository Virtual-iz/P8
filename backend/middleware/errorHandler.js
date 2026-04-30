/**
 * Middleware de gestion centralisée des erreurs.
 * Renvoie [] pour /api/projects et /api/testimonies afin d'éviter
 * "TypeError: projects.filter is not a function" côté front.
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur :', err.message);

  if (req.path.startsWith('/api/projects') || req.path.startsWith('/api/testimonies')) {
    res.status(err.status || 500).json([]);
  } else {
    res.status(err.status || 500).json({
      message: err.message || 'Une erreur est survenue sur le serveur',
    });
  }
};

export default errorHandler;
