import { useState, useEffect } from 'react';
import ProjectsGallery from '../../components/projectsgallery/ProjectsGallery';
import Filters from '../../components/filters/Filters';
import './Portfolio.scss';

/**
 * Section Portfolio de la page d'accueil.
 * Gère :
 * - Les filtres de projets
 * - Le passage du statut admin à ProjectsGallery
 * @param {boolean} isAdmin - Statut admin de l'utilisateur
 */
const Portfolio = ({ isAdmin }) => {
  // État pour les filtres actifs (par défaut : "all")
  const [activeFilters, setActiveFilters] = useState(new Set(['all']));

  /**
   * Met à jour les filtres actifs.
   * @param {Set} filters - Nouveau Set de filtres
   */
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  // Réinitialise les filtres à "Tous" lors du rechargement de la page
  useEffect(() => {
    const handleBeforeUnload = () => {
      setActiveFilters(new Set(['all']));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Réinitialise les filtres à "Tous" lors du premier rendu
  useEffect(() => {
    setActiveFilters(new Set(['all']));
  }, []);

  return (
    <section id="portfolio">
      <div className="sectiontitle">
        <h2>PORTFOLIO</h2>
        <div className="yellowline" aria-hidden="true"></div>
      </div>
      <Filters
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
      />
      {/* ✅ Transmet isAdmin à ProjectsGallery */}
      <ProjectsGallery
        activeFilters={activeFilters}
        isAdmin={isAdmin}
      />
    </section>
  );
};

export default Portfolio;