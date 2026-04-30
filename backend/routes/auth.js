import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

/**
 * POST /api/auth/login
 * Route pour la connexion admin.
 * - Vérifie les identifiants (id + password) depuis .env
 * - Renvoie un token JWT valide 2h si les identifiants sont corrects
 * - Renvoie une erreur 401 sinon
 */
router.post('/login', login);

export default router;