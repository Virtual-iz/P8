import express from 'express';
import { getAllTestimonies } from '../controllers/testimoniesController.js';

const router = express.Router();

router.get('/', getAllTestimonies);

export default router;
