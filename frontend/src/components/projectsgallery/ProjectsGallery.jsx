import { useState, useEffect } from 'react';
import './ProjectsGallery.scss';
import ProjectCard from '../projectcard/ProjectCard';
import ProjectModal from '../projectmodal/ProjectModal';
import AdminModal from '../adminmodal/AdminModal';
import { API_URL } from '../../config';  // ✅ Chemin corrigé : ../../config (depuis src/components/projectsgallery/)
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Composant ProjectsGallery.
 * Affiche une galerie de projets avec :
 * - Lecture seule pour les visiteurs
 * - Mode édition pour les admins (via AdminModal)
 * - Carte "Nouveau Projet" pour créer un projet (uniquement pour les admins)
 * @param {Set} activeFilters - Filtres actifs pour filtrer les projets
 * @param {boolean} isAdmin - Statut admin de l'utilisateur
 */
const ProjectsGallery = ({ activeFilters, isAdmin }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  /**
   * Charge les projets depuis l'API au montage du composant.
   */
  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then(res => {
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('❌ Erreur chargement projets:', err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  /**
   * Sauvegarde un projet (création ou mise à jour).
   * @param {Object|FormData} updatedProject - Projet avec les modifications ou FormData (si images uploadées)
   */
  const handleSave = async (updatedProject) => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      alert('Vous devez être connecté pour modifier un projet');
      return;
    }

    try {
      const url = updatedProject.id
        ? `${API_URL}/api/projects/${updatedProject.id}`
        : `${API_URL}/api/projects`;
      const method = updatedProject.id ? 'PUT' : 'POST';

      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      if (!(updatedProject instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(url, {
        method: method,
        headers: headers,
        body: updatedProject instanceof FormData
          ? updatedProject
          : JSON.stringify(updatedProject)
      });

      if (!res.ok) throw new Error('Erreur sauvegarde');

      const saved = await res.json();
      setProjects(prev => {
        if (!Array.isArray(prev)) return [saved];
        return updatedProject.id
          ? prev.map(p => p.id === saved.id ? saved : p)
          : [...prev, saved];
      });
      setEditingProject(null);
      setSelectedProject(null);
    } catch (err) {
      console.error('❌ Erreur sauvegarde:', err);
      alert('Erreur lors de la sauvegarde du projet');
    }
  };

  /**
   * Filtre les projets selon les filtres actifs.
   * @returns {Array} Tableau de projets filtrés
   */
  const filteredProjects = Array.isArray(projects)
    ? projects.filter(project => {
        if (activeFilters.has('all')) return true;
        return project.filtres?.some(f => activeFilters.has(f));
      })
    : [];

  if (loading) return <p>Chargement des projets...</p>;

  return (
    <>
      <article id="projectsgallery" className="grid col3">
        {/* ✅ CARTE "NOUVEAU PROJET" POUR LES ADMINS */}
        {isAdmin && (
          <div
            className="projectcard new-project-card"
            onClick={() => setEditingProject({
              id: '',
              title: '',
              p1: '',
              cover: '',
              demo: '',
              title2: '',
              title3: '',
              title4: '',
              pictures: [],
              p2: [],
              p3: [],
              p4: [],
              filtres: [],
              tags: []
            })}
            role="button"
            aria-label="Créer un nouveau projet"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setEditingProject({
                  id: '',
                  title: '',
                  p1: '',
                  cover: '',
                  demo: '',
                  title2: '',
                  title3: '',
                  title4: '',
                  pictures: [],
                  p2: [],
                  p3: [],
                  p4: [],
                  filtres: [],
                  tags: []
                });
              }
            }}
          >
            <div className="new-project-content">
              <FontAwesomeIcon icon={faPlus} className="new-project-icon" aria-hidden="true" />
              <span>Nouveau Projet</span>
            </div>
          </div>
        )}

        {/* Projets existants */}
        {filteredProjects.length > 0 ? (
          filteredProjects.map(item => (
            <ProjectCard
              key={item.id}
              item={item}
              onOpen={setSelectedProject}
              isAdmin={isAdmin}
              onEdit={setEditingProject}
            />
          ))
        ) : (
          <p>Aucun projet trouvé pour les filtres sélectionnés.</p>
        )}
      </article>

      {/* MODALES */}
      {isAdmin && editingProject && (
        <AdminModal
          project={editingProject}
          onClose={() => {
            setEditingProject(null);
            setSelectedProject(null);
          }}
          onSave={handleSave}
        />
      )}
      {selectedProject && !editingProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsGallery;