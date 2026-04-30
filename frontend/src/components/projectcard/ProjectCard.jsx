import './ProjectCard.scss';
import Tag from '../tag/Tag';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPen } from "@fortawesome/free-solid-svg-icons";
import { IMG_URL } from '../../config';

/**
 * Carte de projet : image de couverture, titre, description,
 * boutons "Détails" et "Modifier" (admin uniquement), tags.
 */
const ProjectCard = ({ item, onOpen, isAdmin, onEdit }) => {
  if (!item) return null;

  return (
    <article className="projectcard">
      <img
        src={`${IMG_URL}/${item.cover}`}
        alt={`Couverture du projet : ${item.title}`}
        loading="lazy"
        decoding="async"
      />
      <div className="content">
        <h3>{item.title}</h3>
        <p>{item.p1}</p>

        <div className="card-actions">
          <button
            className="openModal-btn"
            onClick={() => onOpen(item)}
            aria-label={`Voir les détails du projet ${item.title}`}
          >
            Détails <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </button>

          {isAdmin && (
            <button
              className="edit-btn"
              onClick={() => onEdit(item)}
              aria-label={`Modifier le projet ${item.title}`}
            >
              <FontAwesomeIcon icon={faPen} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="tags" aria-label={`Tags : ${item.tags?.join(', ') || 'Aucun'}`}>
          {item.tags?.map((tag, index) => (
            <Tag key={index} item={tag} />
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
