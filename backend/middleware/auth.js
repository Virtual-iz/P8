import jwt from 'jsonwebtoken';

/**
 * Middleware pour vérifier la validité du token JWT.
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 */
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie la présence du header Authorization avec un token Bearer
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  // Extrait le token du header
  const token = authHeader.split(' ')[1];

  try {
    // Vérifie et décode le token
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    // Token invalide ou expiré
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

export default auth;