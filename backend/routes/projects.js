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

/**
 * GET /api/projects
 * Renvoie la liste de tous les projets.
 */
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(PROJECTS_PATH, 'utf-8');
    const projects = JSON.parse(data);
    res.json(projects);
  } catch (err) {
    console.error('❌ Erreur lecture projets:', err);
    res.status(500).json([]);
  }
});

/**
 * POST /api/projects
 * Crée un nouveau projet (admin uniquement).
 * - Convertit les images en WebP avec une qualité de 80%
 * - Redimensionne à 80% de la taille originale (max 800x800px)
 */
router.post('/', upload.array('images', 10), auth, async (req, res) => {
  try {
    if (!req.body.data) {
      return res.status(400).json({ message: 'Données du projet manquantes' });
    }

    const data = await fs.readFile(PROJECTS_PATH, 'utf-8');
    let projects = JSON.parse(data);
    const newId = Date.now() + '-' + Math.floor(Math.random() * 10000);
    const imageFilenames = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // ✅ NOUVEAU : Nom du fichier de sortie en .webp
        const outputFilename = path.parse(file.filename).name + '.webp';
        const outputPath = path.join(__dirname, '../../img/', outputFilename);

        // ✅ NOUVEAU : Redimensionne à 80% de la taille originale + convertit en WebP avec qualité 80%
        await sharp(file.path)
          .resize({
            width: Math.round(file.width * 0.8),  // 80% de la largeur originale
            height: Math.round(file.height * 0.8), // 80% de la hauteur originale
            fit: 'inside',                      // Conserve les proportions
            withoutEnlargement: true           // Ne pas agrandir si déjà plus petit
          })
          .webp({ quality: 80 })               // ✅ Convertit en WebP avec qualité 80%
          .toFile(outputPath);

        // Supprime le fichier temporaire
        await fs.unlink(file.path);

        imageFilenames.push(outputFilename);
      }
    }

    const projectData = JSON.parse(req.body.data);
    const newProject = {
      id: newId,
      ...projectData,
      pictures: imageFilenames.length > 0
        ? imageFilenames
        : (projectData.pictures || [])
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
 * PUT /api/projects/:id
 * Met à jour un projet existant (admin uniquement).
 * - Ajoute les nouvelles images en WebP (80% qualité + 80% taille)
 * - Conserve les images existantes
 */
router.put('/:id', upload.array('images', 10), auth, async (req, res) => {
  try {
    if (!req.body.data) {
      return res.status(400).json({ message: 'Données du projet manquantes' });
    }

    const data = await fs.readFile(PROJECTS_PATH, 'utf-8');
    let projects = JSON.parse(data);
    const index = projects.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    const newImageFilenames = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // ✅ NOUVEAU : Nom du fichier de sortie en .webp
        const outputFilename = path.parse(file.filename).name + '.webp';
        const outputPath = path.join(__dirname, '../../img/', outputFilename);

        // ✅ NOUVEAU : Redimensionne + WebP 80%
        await sharp(file.path)
          .resize({
            width: Math.round(file.width * 0.8),
            height: Math.round(file.height * 0.8),
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 80 })
          .toFile(outputPath);

        await fs.unlink(file.path);
        newImageFilenames.push(outputFilename);
      }
    }

    const updatedData = JSON.parse(req.body.data);
    const existingProject = projects[index];
    const allImages = [...(existingProject.pictures || []), ...newImageFilenames];
    updatedData.pictures = allImages;

    projects[index] = { ...existingProject, ...updatedData };
    await fs.writeFile(PROJECTS_PATH, JSON.stringify(projects, null, 2));
    res.json(projects[index]);
  } catch (err) {
    console.error('❌ Erreur modification projet:', err);
    res.status(500).json({ message: 'Erreur modification projet: ' + err.message });
  }
});

export default router;