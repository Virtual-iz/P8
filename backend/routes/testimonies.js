import express from 'express';
import { getAllTestimonies } from '../controllers/testimoniesController.js';

const router = express.Router();

/**
 * GET /api/testimonies
 * Renvoie la liste de tous les témoignages.
 */
router.get('/', getAllTestimonies);

export default router;