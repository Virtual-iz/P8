import React, { useState } from 'react';
import './Filters.scss';

const Filters = ({ onFilterChange, activeFilters }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'webdesign', label: 'Webdesign' },
    { id: 'front', label: 'Front' },
    { id: 'back', label: 'Back' },
    { id: 'photo', label: 'Photo' },
    { id: 'imprime', label: 'Imprimé' },
    { id: 'autre', label: 'Autre' },
  ];

  const handleFilterClick = (filter) => {
    onFilterChange(new Set([filter === activeFilters.values().next().value ? 'all' : filter]));
  };

  const toggleMobileFilters = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <article className="filter-bar">
      
      <div className={`filters-wrapper ${isMobileOpen ? 'active' : ''}`}>
        <div className="filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilters.has(category.id) ? 'active' : ''}`}
              onClick={() => handleFilterClick(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Filters;