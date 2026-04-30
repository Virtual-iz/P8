import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from '../middleware/upload.js';
import sharp from 'sharp';
import auth from '../middleware/auth.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_PATH = path.join(__dirname, '../datas/projects.json');
// __dirname = backend/routes/ → ../img/ = backend/img/
const IMG_DIR = path.join(__dirname, '../img/');

/** GET /api/projects — renvoie la liste de tous les projets. */
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(PROJECTS_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('❌ Erreur lecture projets:', err);
    res.status(500).json([]);
  }
});

/**
 * Convertit un fichier uploadé en WebP (qualité 80%, taille réduite à 80%).
 * Supprime le fichier temporaire après conversion.
 * @returns {Promise<string>} Nom du fichier .webp généré.
 */
const processImage = async (file) => {
  const outputFilename = path.parse(file.filename).name + '.webp';
  const outputPath = path.join(IMG_DIR, outputFilename);

  // Lecture des dimensions réelles via metadata (file.width/height n'existent pas dans multer)
  const { width, height } = await sharp(file.path).metadata();

  await sharp(file.path)
    .resize({
      width: Math.round(width * 0.8),
      height: Math.round(height * 0.8),
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: 80 })
    .toFile(outputPath);

  await fs.unlink(file.path); // Supprime le fichier temporaire
  return outputFilename;
};

/**
 * POST /api/projects — crée un nouveau projet (admin uniquement).
 * Les images sont converties en WebP et stockées dans backend/img/.
 */
router.post('/', upload.array('images', 10), auth, async (req, res) => {
  try {
    if (!req.body.data) {
      return res.status(400).json({ message: 'Données du projet manquantes' });
    }

    const projects = JSON.parse(await fs.readFile(PROJECTS_PATH, 'utf-8'));
    const projectData = JSON.parse(req.body.data);

    const imageFilenames = req.files?.length > 0
      ? await Promise.all(req.files.map(processImage))
      : [];

    const newProject = {
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      ...projectData,
      pictures: imageFilenames.length > 0 ? imageFilenames : (projectData.pictures || [])
    };

    projects.push(newProject);
    await fs.writeFile(PROJECTS_PATH, JSON.stringify(projects, null, 2));
    res.status(201).json(newProject);
  } catch (err) {
    console.error('❌ Erreur création projet:', err);
    res.status(500).json({ message: 'Erreur création projet: ' + err.message });
  }
});

/**
 * PUT /api/projects/:id — met à jour un projet existant (admin uniquement).
 * Les nouvelles images sont ajoutées aux images existantes.
 */
router.put('/:id', upload.array('images', 10), auth, async (req, res) => {
  try {
    if (!req.body.data) {
      return res.status(400).json({ message: 'Données du projet manquantes' });
    }

    const projects = JSON.parse(await fs.readFile(PROJECTS_PATH, 'utf-8'));
    const index = projects.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    const newImageFilenames = req.files?.length > 0
      ? await Promise.all(req.files.map(processImage))
      : [];

    const updatedData = JSON.parse(req.body.data);
    // updatedData.pictures contient la liste éditée dans AdminModal (textarea),
    // on y ajoute les éventuelles nouvelles images uploadées
    updatedData.pictures = [...(updatedData.pictures || []), ...newImageFilenames];

    projects[index] = { ...projects[index], ...updatedData };
    await fs.writeFile(PROJECTS_PATH, JSON.stringify(projects, null, 2));
    res.json(projects[index]);
  } catch (err) {
    console.error('❌ Erreur modification projet:', err);
    res.status(500).json({ message: 'Erreur modification projet: ' + err.message });
  }
});

export default router;
