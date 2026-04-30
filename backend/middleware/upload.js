import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// __dirname = backend/middleware/ → ../img/ = backend/img/
const UPLOAD_DIR = path.join(__dirname, '../img/');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // Nom unique : timestamp + aléatoire + extension d'origine (sera converti en .webp ensuite)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

/** Rejette tout fichier dont le MIME ne commence pas par 'image/'. */
const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith('image/')
    ? cb(null, true)
    : cb(new Error('Seules les images (JPG, PNG, GIF, WebP) sont autorisées'), false);
};

/**
 * Middleware multer pour les uploads d'images.
 * - 10 fichiers max par requête
 * - 5 Mo max par fichier
 * - Images uniquement
 */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 Mo
    files: 10
  }
});

export default upload;
