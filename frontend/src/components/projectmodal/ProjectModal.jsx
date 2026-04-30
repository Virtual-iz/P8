import './ProjectModal.scss';
import Carrousel from '../carrousel/Carrousel';
import Tag from '../tag/Tag';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/** Modale de détail d'un projet : carrousel, tags, lien démo, textes. */
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
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Fermer la modale"
        >
          ✕
        </button>

        <Carrousel data={project} />

        <article className="modal-top">
          <div className="tags-container" aria-label={`Filtres : ${project.filtres?.join(', ') || 'Aucun'}`}>
            {project.filtres?.map((f, i) => (
              <Tag key={i} item={f} />
            ))}
          </div>

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

        <article className="modal-text grid col2">
          <div>
            <h3 id="modal-title">{project.title}</h3>
            <p>{project.p1}</p>
          </div>
          <div>
            <h3>{project.title2}</h3>
            {project.p2?.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div>
            <h3>{project.title3}</h3>
            {project.p3?.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div>
            <h3>{project.title4}</h3>
            {project.p4?.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProjectModal;
