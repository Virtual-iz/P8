import jwt from 'jsonwebtoken';

/** Connexion admin : vérifie les identifiants et renvoie un token JWT (2h). */
export const login = (req, res) => {
  const { id, password } = req.body;

  if (id !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Identifiants incorrects' });
  }

  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};
