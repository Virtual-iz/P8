import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TESTIMONIES_PATH = path.join(__dirname, '../datas/testimonies.json');

/** @returns {Promise<Array>} Tableau de témoignages, ou [] en cas d'erreur. */
const readTestimonies = async () => {
  try {
    const data = await fs.readFile(TESTIMONIES_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('❌ Erreur lecture fichier testimonies.json :', err.message);
    return [];
  }
};

/** GET /api/testimonies */
export const getAllTestimonies = async (req, res) => {
  try {
    const testimonies = await readTestimonies();
    res.json(testimonies);
  } catch (err) {
    res.json([]);
  }
};
