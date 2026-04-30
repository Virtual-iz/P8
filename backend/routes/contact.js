import express from 'express';
import { sendMessage } from '../controllers/contactController.js';

const router = express.Router();

/**
 * POST /api/contact
 * Route pour l'envoi de messages via le formulaire de contact.
 * - Vérifie la présence des champs obligatoires (name, email, message)
 * - Envoie un email via SMTP (configuré dans .env)
 */
router.post('/', sendMessage);

export default router;