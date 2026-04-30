import { useState, useRef } from 'react';
import './AdminModal.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlus, faXmark, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IMG_URL } from '../../config';

// ========== UTILITAIRES ==========
/** Convertit une string CSV en tableau (éléments non vides). */
const csvToArray = (str) => str.split(',').map(s => s.trim()).filter(Boolean);

/** Convertit une string avec sauts de ligne en tableau (éléments non vides). */
const linesToArray = (str) => str.split('\n').map(s => s.trim()).filter(Boolean);

// ========== COMPOSANT PRINCIPAL ==========
/**
 * Formulaire d'édition de projet (admin uniquement).
 * Structuré comme la modale de visionnage : galerie en haut, grille de texte en bas.
 * Envoie toujours un FormData : requis par multer qui lit les données via req.body.data.
 */
const AdminModal = ({ project, onClose, onSave, onDelete }) => {
  const fileInputRef = useRef(null);

  // Images existantes (celles retirées seront supprimées côté backend)
  const [pictures, setPictures] = useState(project?.pictures || []);
  const [cover, setCover] = useState(project?.cover || project?.pictures?.[0] || '');

  // Nouvelles images sélectionnées (avant upload)
  const [newImages, setNewImages] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);

  // Champs textuels
  const [form, setForm] = useState({
    id: project?.id || '',
    title: project?.title || '',
    p1: project?.p1 || '',
    demo: project?.demo || '',
    title2: project?.title2 || '',
    title3: project?.title3 || '',
    title4: project?.title4 || '',
    _p2: (project?.p2 || []).join('\n'),
    _p3: (project?.p3 || []).join('\n'),
    _p4: (project?.p4 || []).join('\n'),
    _filtres: (project?.filtres || []).join(', '),
    _tags: (project?.tags || []).join(', '),
  });

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  /** Retire une image existante de la liste — sera supprimée du disque à la sauvegarde. */
  const removeExistingImage = (filename) => {
    const remaining = pictures.filter(p => p !== filename);
    setPictures(remaining);
    // Si l'image supprimée était la couverture, on prend la suivante
    if (cover === filename) setCover(remaining[0] || '');
  };

  /** Retire une image nouvellement sélectionnée (avant upload). */
  const removeNewImage = (index) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
    setNewPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    e.target.value = ''; // reset pour pouvoir resélectionner le même fichier
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: form.id,
      title: form.title,
      p1: form.p1,
      cover,
      demo: form.demo,
      title2: form.title2,
      title3: form.title3,
      title4: form.title4,
      pictures, // liste après suppressions — le backend supprimera les fichiers retirés
      p2: linesToArray(form._p2),
      p3: linesToArray(form._p3),
      p4: linesToArray(form._p4),
      filtres: csvToArray(form._filtres),
      tags: csvToArray(form._tags),
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));
    newImages.forEach(file => formData.append('images', file));
    onSave(formData);
  };

  if (!project) return null;

  const isExisting = !!project.id;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        tabIndex="-1"
      >
        <button className="close-btn" onClick={onClose} aria-label="Fermer la modale d'édition">
          ✕
        </button>

        <form onSubmit={handleSubmit}>

          {/* ===== GALERIE D'IMAGES ===== */}
          <div className="admin-gallery" role="list" aria-label="Images du projet">

            {/* Images existantes */}
            {pictures.map(pic => (
              <div
                key={pic}
                className={`admin-thumb ${cover === pic ? 'admin-thumb--cover' : ''}`}
                role="listitem"
              >
                <img src={`${IMG_URL}/${pic}`} alt={pic} />
                <div className="admin-thumb__actions">
                  <button
                    type="button"
                    className="admin-thumb__star"
                    onClick={() => setCover(pic)}
                    title="Définir comme couverture"
                    aria-label={`Définir ${pic} comme couverture`}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </button>
                  <button
                    type="button"
                    className="admin-thumb__remove"
                    onClick={() => removeExistingImage(pic)}
                    aria-label={`Supprimer l'image ${pic}`}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
                {cover === pic && (
                  <span className="admin-thumb__label">Couverture</span>
                )}
              </div>
            ))}

            {/* Prévisualisations des nouvelles images sélectionnées */}
            {newPreviews.map((url, i) => (
              <div key={url} className="admin-thumb admin-thumb--new" role="listitem">
                <img src={url} alt={`Nouvelle image ${i + 1}`} />
                <div className="admin-thumb__actions">
                  <button
                    type="button"
                    className="admin-thumb__remove"
                    onClick={() => removeNewImage(i)}
                    aria-label="Annuler cette image"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
                <span className="admin-thumb__label">Nouveau</span>
              </div>
            ))}

            {/* Bouton "Ajouter" */}
            <button
              type="button"
              className="admin-thumb admin-thumb--add"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Ajouter des images"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Ajouter</span>
            </button>

            {/* Input fichier caché */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="admin-file-hidden"
              aria-label="Sélectionner des images"
            />
          </div>

          {/* ===== MODAL-TOP : filtres + URL démo ===== */}
          <div className="modal-top">
            <input
              value={form._filtres}
              onChange={e => set('_filtres', e.target.value)}
              placeholder="filtres : front, back, webdesign..."
              className="admin-input admin-input--inline"
              aria-label="Filtres du projet"
            />
            <input
              type="url"
              value={form.demo}
              onChange={e => set('demo', e.target.value)}
              placeholder="https://demo..."
              className="admin-input admin-input--demo"
              aria-label="URL de la démo"
            />
          </div>

          {/* ===== GRILLE DE TEXTE (comme ProjectModal) ===== */}
          <div className="modal-text grid col2">

            <div>
              <input
                id="admin-modal-title"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                className="admin-title-input"
                required
                aria-label="Titre du projet"
                placeholder="Titre du projet"
              />
              <textarea
                value={form.p1}
                onChange={e => set('p1', e.target.value)}
                className="admin-textarea"
                rows={4}
                aria-label="Description courte"
                placeholder="Description courte..."
              />
            </div>

            <div>
              <input
                value={form.title2}
                onChange={e => set('title2', e.target.value)}
                className="admin-title-input"
                aria-label="Titre section 2"
                placeholder="Objectifs du projet"
              />
              <textarea
                value={form._p2}
                onChange={e => set('_p2', e.target.value)}
                className="admin-textarea"
                rows={4}
                aria-label="Paragraphes section 2 — un par ligne"
                placeholder="Un paragraphe par ligne..."
              />
            </div>

            <div>
              <input
                value={form.title3}
                onChange={e => set('title3', e.target.value)}
                className="admin-title-input"
                aria-label="Titre section 3"
                placeholder="Défis"
              />
              <textarea
                value={form._p3}
                onChange={e => set('_p3', e.target.value)}
                className="admin-textarea"
                rows={4}
                aria-label="Paragraphes section 3 — un par ligne"
                placeholder="Un paragraphe par ligne..."
              />
            </div>

            <div>
              <input
                value={form.title4}
                onChange={e => set('title4', e.target.value)}
                className="admin-title-input"
                aria-label="Titre section 4"
                placeholder="Solutions apportées"
              />
              <textarea
                value={form._p4}
                onChange={e => set('_p4', e.target.value)}
                className="admin-textarea"
                rows={4}
                aria-label="Paragraphes section 4 — un par ligne"
                placeholder="Un paragraphe par ligne..."
              />
            </div>

          </div>

          {/* ===== FOOTER : tags + actions ===== */}
          <div className="admin-footer">

            <div className="admin-field">
              <label className="admin-label" htmlFor="admin-tags">
                Tags (séparés par des virgules)
              </label>
              <input
                id="admin-tags"
                value={form._tags}
                onChange={e => set('_tags', e.target.value)}
                className="admin-input"
                placeholder="React, Node, MongoDB..."
              />
            </div>

            <div className="admin-footer__actions">
              {/* Suppression du projet (admin uniquement, projet existant) */}
              {isExisting && onDelete && (
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDelete(form.id)}
                  aria-label="Supprimer ce projet définitivement"
                >
                  <FontAwesomeIcon icon={faTrash} aria-hidden="true" /> x
                </button>
              )}

              <button type="submit" className="validate-btn" aria-label="Sauvegarder les modifications">
                <FontAwesomeIcon icon={faSave} aria-hidden="true" />Enregistrer
              </button>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminModal;
