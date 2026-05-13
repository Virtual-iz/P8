import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
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
app.set('trust proxy', 1);

// ── Compression gzip ──────────────────────────────────────────────────────────
app.use(compression());

// ── Sécurité HTTP ─────────────────────────────────────────────────────────────
// crossOriginResourcePolicy: 'cross-origin' requis pour que le frontend
// (origine différente) puisse charger les images servies par /img.
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
// Liste blanche des origines autorisées à appeler l'API.
// N'affecte pas les visiteurs (navigation normale) — uniquement les fetch() JS cross-origin.
const allowedOrigins = [
  'https://virtual-iz.fr',
  'https://www.virtual-iz.fr',
  'http://localhost:5173', // dev
];

app.use(cors({
  origin: (origin, callback) => {
    // Autorise aussi les requêtes sans origin (Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Rate limiting ─────────────────────────────────────────────────────────────

// Auth : 10 tentatives par IP sur 15 min — protection bruteforce admin
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Trop de tentatives, réessayez dans 15 minutes.' },
});

// Contact : 5 messages par IP par heure — protection spam SMTP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Trop de messages envoyés, réessayez dans une heure.' },
});

// ── Routes API ────────────────────────────────────────────────────────────────
app.use('/api/auth',        authLimiter,    authRoutes);
app.use('/api/contact',     contactLimiter, contactRoutes);
app.use('/api/projects',                    projectsRoutes);
app.use('/api/testimonies',                 testimoniesRoutes);

// ── Gestion centralisée des erreurs (doit rester en dernier) ──────────────────
app.use(errorHandler);

export default app;