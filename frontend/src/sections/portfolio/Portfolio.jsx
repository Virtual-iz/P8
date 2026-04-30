import { useState, useEffect } from 'react';
import ProjectsGallery from '../../components/projectsgallery/ProjectsGallery';
import Filters from '../../components/filters/Filters';
import './Portfolio.scss';

/** Section Portfolio — gère les filtres et transmet le statut admin. */
const Portfolio = ({ isAdmin }) => {
  const [activeFilters, setActiveFilters] = useState(new Set(['all']));

  // Réinitialise les filtres à "Tous" au chargement et au rechargement de page
  useEffect(() => {
    setActiveFilters(new Set(['all']));
    const reset = () => setActiveFilters(new Set(['all']));
    window.addEventListener('beforeunload', reset);
    return () => window.removeEventListener('beforeunload', reset);
  }, []);

  return (
    <section id="portfolio">
      <div className="sectiontitle">
        <h2>PORTFOLIO</h2>
        <div className="yellowline" aria-hidden="true"></div>
      </div>
      <Filters
        onFilterChange={setActiveFilters}
        activeFilters={activeFilters}
      />
      <ProjectsGallery
        activeFilters={activeFilters}
        isAdmin={isAdmin}
      />
    </section>
  );
};

export default Portfolio;
