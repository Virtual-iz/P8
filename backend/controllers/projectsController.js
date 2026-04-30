import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_PATH = path.join(__dirname, '../datas/projects.json');

/** @returns {Promise<Array>} Tableau de projets, ou [] en cas d'erreur. */
const readProjects = async () => {
  try {
    const data = await fs.readFile(PROJECTS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('❌ Erreur lecture fichier projects.json :', err.message);
    return [];
  }
};

const writeProjects = async (projects) => {
  await fs.writeFile(PROJECTS_PATH, JSON.stringify(projects, null, 2));
};

/** GET /api/projects */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await readProjects();
    res.json(projects);
  } catch (err) {
    res.json([]);
  }
};

/** PUT /api/projects/:id */
export const updateProject = async (req, res, next) => {
  try {
    const projects = await readProjects();
    const index = projects.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    projects[index] = { ...projects[index], ...req.body };
    await writeProjects(projects);
    res.json(projects[index]);
  } catch (err) {
    err.status = 500;
    err.message = 'Erreur modification projet';
    next(err);
  }
};
