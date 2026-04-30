import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TESTIMONIES_PATH = path.join(__dirname, '../datas/testimonies.json');

/**
 * Lit le fichier testimonies.json.
 * @returns {Promise<Array>} Tableau de témoignages.
 */
const readTestimonies = async () => {
  try {
    const data = await fs.readFile(TESTIMONIES_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('❌ Erreur lecture fichier testimonies.json :', err.message);
    return [];
  }
};

/**
 * Contrôleur pour GET /api/testimonies
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
export const getAllTestimonies = async (req, res) => {
  try {
    const testimonies = await readTestimonies();
    res.json(testimonies);
  } catch (err) {
    res.json([]);
  }
};