import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import projectsRoutes from './routes/projects.js';
import testimoniesRoutes from './routes/testimonies.js';
import contactRoutes from './routes/contact.js';
import errorHandler from './middleware/errorHandler.js';

// Charge les variables d'environnement depuis .env
dotenv.config();

const app = express();

// Sert les images des projets depuis backend/img/
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/img', express.static(path.join(__dirname, 'img')));

// Middleware pour parser les requêtes JSON (limite à 10Mo pour éviter les attaques DoS)
app.use(express.json({ limit: '10mb' }));

// Middleware CORS sécurisé : autorise uniquement le frontend et les méthodes nécessaires
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes de l'API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/testimonies', testimoniesRoutes);
app.use('/api/contact', contactRoutes);

// Middleware de gestion des erreurs (DOIT être le dernier middleware)
app.use(errorHandler);

export default app;