import './ProjectModal.scss';
import Carrousel from '../carrousel/Carrousel';
import Tag from '../tag/Tag';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/**
 * Composant ProjectModal.
 * Affiche une modale avec les détails d'un projet.
 * @param {Object} project - Projet à afficher
 * @param {Function} onClose - Fonction pour fermer la modale
 */
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
      >
        {/* Bouton de fermeture */}
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Fermer la modale"
        >
          ✕
        </button>

        {/* Carrousel d'images (avec lazy loading géré dans Carrousel) */}
        <Carrousel data={project} />

        <article className="modal-top">
          {/* Tags du projet */}
          <div className="tags-container" aria-label={`Filtres : ${project.filtres?.join(', ') || 'Aucun'}`}>
            {project.filtres?.map((f, i) => (
              <Tag key={i} item={f} />
            ))}
          </div>

          {/* Bouton Démo */}
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="demo-btn"
            aria-label={`Voir la démo du projet ${project.title}`}
          >
            Démo <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </a>
        </article>

        {/* Contenu textuel du projet */}
        <article className="modal-text grid col2">
          <div>
            <h3 id="modal-title">{project.title}</h3>
            <p>{project.p1}</p>
          </div>
          <div>
            <h3>{project.title2}</h3>
            {project.p2?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div>
            <h3>{project.title3}</h3>
            {project.p3?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div>
            <h3>{project.title4}</h3>
            {project.p4?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProjectModal;