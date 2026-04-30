import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Chemin absolu vers le dossier courant (backend/middleware/)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// ✅ Chemin vers le dossier img/ À LA RACINE du projet
const UPLOAD_DIR = path.join(__dirname, '../../img/');

/**
 * Configuration du stockage des images uploadées.
 * Les images sont sauvegardées dans le dossier img/ à la racine.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Génère un nom de fichier unique : timestamp + nombre aléatoire + extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // ✅ Garde l'extension originale pour référence, mais on convertira en WebP
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

/**
 * Filtre pour accepter uniquement les fichiers image.
 * @param {Object} req - Requête Express
 * @param {Object} file - Fichier uploadé
 * @param {Function} cb - Callback (error, accept)
 */
const fileFilter = (req, file, cb) => {
  // Accepte uniquement les fichiers dont le type MIME commence par 'image/'
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images (JPG, PNG, GIF, WebP) sont autorisées'), false);
  }
};

/**
 * Middleware multer pour gérer les uploads d'images.
 * - Limite : 10 images max par requête
 * - Taille max par image : 5 Mo
 * - Types autorisés : images uniquement
 */
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 Mo
    files: 10
  }
});

export default upload;