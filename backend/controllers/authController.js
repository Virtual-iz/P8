import jwt from 'jsonwebtoken';

/**
 * Contrôleur pour la connexion admin.
 * @param {Object} req - Requête Express (contient req.body.id et req.body.password)
 * @param {Object} res - Réponse Express
 */
export const login = (req, res) => {
  // Récupère les identifiants depuis le corps de la requête
  const { id, password } = req.body;

  // Vérifie si les identifiants correspondent à ceux dans .env
  if (id !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Identifiants incorrects' });
  }

  // Génère un token JWT valide pendant 2 heures avec le rôle "admin"
  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  // Renvoie le token au client
  res.json({ token });
};