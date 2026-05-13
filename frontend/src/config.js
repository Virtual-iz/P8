// Les variables VITE_ sont injectées par Vite au build (voir .env et .env.production)
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';
export const IMG_URL = import.meta.env.VITE_IMG_URL ?? 'http://localhost:3001/img';
