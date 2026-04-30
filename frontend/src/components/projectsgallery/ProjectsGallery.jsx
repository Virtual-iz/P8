import { useState, useEffect } from 'react';
import './ProjectsGallery.scss';
import ProjectCard from '../projectcard/ProjectCard';
import ProjectModal from '../projectmodal/ProjectModal';
import AdminModal from '../adminmodal/AdminModal';
import { API_URL } from '../../config';  // ✅ Chemin corrigé : ../../config (depuis src/components/projectsgallery/)
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Galerie de projets.
 * - Lecture seule pour les visiteurs
 * - Mode édition pour les admins (via AdminModal)
 * - Carte "Nouveau Projet" pour les admins
 */
const ProjectsGallery = ({ activeFilters, isAdmin }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // API_URL inclut déjà /api, ne pas l'ajouter dans le chemin
  useEffect(() => {
    fetch(`${API_URL}/projects`)
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

  /** Sauvegarde un projet (création ou mise à jour) via l'API. */
  const handleSave = async (updatedProject) => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      alert('Vous devez être connecté pour modifier un projet');
      return;
    }

    try {
      // updatedProject est toujours un FormData (cf. AdminModal)
      const id = JSON.parse(updatedProject.get('data')).id;
      const url = id ? `${API_URL}/projects/${id}` : `${API_URL}/projects`;
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: updatedProject,
      });

      if (!res.ok) throw new Error('Erreur sauvegarde');

      const saved = await res.json();
      setProjects(prev => {
        if (!Array.isArray(prev)) return [saved];
        return id
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

  const filteredProjects = Array.isArray(projects)
    ? projects.filter(project => {
        if (activeFilters.has('all')) return true;
        return project.filtres?.some(f => activeFilters.has(f));
      })
    : [];

  // Objet vide pour initialiser la modale de création
  const emptyProject = {
    id: '', title: '', p1: '', cover: '', demo: '',
    title2: '', title3: '', title4: '',
    pictures: [], p2: [], p3: [], p4: [], filtres: [], tags: []
  };

  if (loading) return <p>Chargement des projets...</p>;

  return (
    <>
      <article id="projectsgallery" className="grid col3">
        {/* Carte "Nouveau Projet" (admins uniquement) */}
        {isAdmin && (
          <div
            className="projectcard new-project-card"
            onClick={() => setEditingProject(emptyProject)}
            role="button"
            aria-label="Créer un nouveau projet"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setEditingProject(emptyProject);
              }
            }}
          >
            <div className="new-project-content">
              <FontAwesomeIcon icon={faPlus} className="new-project-icon" aria-hidden="true" />
              <span>Nouveau Projet</span>
            </div>
          </div>
        )}

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

      {/* Modales */}
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
