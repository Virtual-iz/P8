import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import projectsRoutes from './routes/projects.js';
import testimoniesRoutes from './routes/testimonies.js';
import contactRoutes from './routes/contact.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// ── Sécurité HTTP ─────────────────────────────────────────────────────────────
// helmet() active automatiquement : CSP, X-Frame-Options, HSTS, X-Content-Type-Options...
// crossOriginResourcePolicy: 'cross-origin' est obligatoire car le frontend (origine différente)
// doit pouvoir charger les images servies par ce backend (/img).
// Sans ce réglage, helmet bloque les requêtes cross-origin sur les ressources statiques.
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// ── Images statiques ──────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/img', express.static(path.join(__dirname, 'img')));

// ── Parsing JSON ──────────────────────────────────────────────────────────────
// Limite à 10 Mo pour se prémunir des attaques DoS par payload massif
app.use(express.json({ limit: '10mb' }));

// ── CORS ──────────────────────────────────────────────────────────────────────
// N'autorise que le frontend, avec les méthodes et headers strictement nécessaires
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Routes API ────────────────────────────────────────────────────────────────
app.use('/api/auth',        authRoutes);
app.use('/api/projects',    projectsRoutes);
app.use('/api/testimonies', testimoniesRoutes);
app.use('/api/contact',     contactRoutes);

// ── Gestion centralisée des erreurs (doit rester en dernier) ──────────────────
app.use(errorHandler);

export default app;