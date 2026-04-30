/**
 * Configuration globale de l'application.
 * Définit les URLs du backend selon l'environnement (dev/prod).
 * À importer via : import { API_URL, IMG_URL } from '../../config'
 */
export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://votre-domaine.com/api'
  : 'http://localhost:3001/api';

// Images des projets servies par le backend (backend/img/)
export const IMG_URL = process.env.NODE_ENV === 'production'
  ? 'https://votre-domaine.com/img'
  : 'http://localhost:3001/img';
