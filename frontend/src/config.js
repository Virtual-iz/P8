/**
 * Configuration globale de l'application.
 * Définit l'URL de l'API backend selon l'environnement (dev/prod).
 * À importer via : import { API_URL } from './config' (depuis src/)
 */
export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://votre-domaine.com/api'  // ✅ URL de production (à remplacer)
  : 'http://localhost:3001/api';    // ✅ URL de développement