import './ProjectCard.scss';
import Tag from '../tag/Tag';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPen } from "@fortawesome/free-solid-svg-icons";

/**
 * Composant ProjectCard.
 * Affiche une carte de projet avec :
 * - Image de couverture (avec lazy loading)
 * - Titre et description courte
 * - Boutons "Détails" et "Modifier" (si admin)
 * @param {Object} item - Projet à afficher
 * @param {Function} onOpen - Fonction pour ouvrir la modale de détails
 * @param {boolean} isAdmin - Statut admin de l'utilisateur
 * @param {Function} onEdit - Fonction pour ouvrir la modale d'édition
 */
const ProjectCard = ({ item, onOpen, isAdmin, onEdit }) => {
  if (!item) return null;

  return (
    <article className="projectcard">
      {/* ✅ IMAGE AVEC LAZY LOADING + ALT POUR ACCESSIBILITÉ */}
      <img
        src={`/img/${item.cover}`}
        alt={`Couverture du projet : ${item.title}`}
        loading="lazy"  // ✅ Lazy loading pour les performances
        decoding="async" // ✅ Décodage asynchrone
      />
      <div className="content">
        <h3>{item.title}</h3>
        <p>{item.p1}</p>

        <div className="card-actions">
          {/* Bouton "Détails" */}
          <button
            className="openModal-btn"
            onClick={() => onOpen(item)}
            aria-label={`Voir les détails du projet ${item.title}`}
          >
            Détails <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </button>

          {/* ✅ BOUTON "MODIFIER" (UNIQUEMENT POUR LES ADMINS) - CRAYON VERT */}
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

        {/* Tags du projet */}
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