import { useState } from 'react';
import './AdminModal.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

// ========== UTILITAIRES ==========
/** Convertit un tableau en string avec sauts de ligne. */
const arrayToLines = (arr) => Array.isArray(arr) ? arr.join('\n') : '';

/** Convertit une string avec sauts de ligne en tableau (éléments non vides). */
const linesToArray = (str) => str.split('\n').map(s => s.trim()).filter(Boolean);

/** Convertit un tableau en string CSV. */
const arrayToCSV = (arr) => Array.isArray(arr) ? arr.join(', ') : '';

/** Convertit une string CSV en tableau (éléments non vides). */
const csvToArray = (str) => str.split(',').map(s => s.trim()).filter(Boolean);

// ========== COMPOSANTS ==========
/** Wrapper label + champ pour éviter la répétition. */
const Field = ({ label, children }) => (
  <div className="admin-field">
    <label className="admin-label">{label}</label>
    {children}
  </div>
);

// ========== COMPOSANT PRINCIPAL ==========
/**
 * Formulaire pour créer/modifier un projet (admin uniquement).
 * Envoie toujours un FormData : requis par le middleware multer du backend
 * qui lit les données via req.body.data (ne parse pas le JSON classique).
 */
const AdminModal = ({ project, onClose, onSave }) => {
  const [form, setForm] = useState({
    id: '',
    title: '',
    p1: '',
    cover: '',
    demo: '',
    title2: '',
    title3: '',
    title4: '',
    ...project,
    _pictures: arrayToLines(project?.pictures),
    _p2: arrayToLines(project?.p2),
    _p3: arrayToLines(project?.p3),
    _p4: arrayToLines(project?.p4),
    _filtres: arrayToCSV(project?.filtres),
    _tags: arrayToCSV(project?.tags),
    _newImages: []
  });

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { _pictures, _p2, _p3, _p4, _filtres, _tags, _newImages, ...rest } = form;

    const payload = {
      ...rest,
      pictures: linesToArray(_pictures),
      p2: linesToArray(_p2),
      p3: linesToArray(_p3),
      p4: linesToArray(_p4),
      filtres: csvToArray(_filtres),
      tags: csvToArray(_tags),
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));
    _newImages.forEach(file => formData.append('images', file));

    onSave(formData);
  };

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div
        className="modal-content admin-modal"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
      >
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Fermer la modale d'édition"
        >
          ✕
        </button>

        <h2 id="admin-modal-title">Modifier le projet</h2>

        <form onSubmit={handleSubmit} className="admin-form">
          <Field label="ID (non modifiable)">
            <input
              value={form.id}
              disabled
              className="admin-input"
              aria-label="ID du projet (non modifiable)"
            />
          </Field>

          <Field label="Titre">
            <input
              value={form.title}
              onChange={e => set('title', e.target.value)}
              className="admin-input"
              required
              aria-label="Titre du projet"
              placeholder="Ex: Site e-commerce pour client X"
            />
          </Field>

          <Field label="Description courte (p1)">
            <textarea
              value={form.p1}
              onChange={e => set('p1', e.target.value)}
              className="admin-textarea"
              rows={3}
              aria-label="Description courte du projet"
              placeholder="Brève description du projet..."
            />
          </Field>

          <div className="admin-grid-2">
            <Field label="Image de couverture (nom du fichier)">
              <input
                value={form.cover}
                onChange={e => set('cover', e.target.value)}
                className="admin-input"
                aria-label="Nom du fichier de l'image de couverture"
                placeholder="ex: mon-projet.png"
              />
            </Field>
            <Field label="Lien démo">
              <input
                type="url"
                value={form.demo}
                onChange={e => set('demo', e.target.value)}
                className="admin-input"
                aria-label="URL de la démo du projet"
                placeholder="https://..."
              />
            </Field>
          </div>

          <Field label="Images du carrousel — un nom de fichier par ligne">
            <textarea
              value={form._pictures}
              onChange={e => set('_pictures', e.target.value)}
              className="admin-textarea"
              rows={4}
              aria-label="Liste des images du carrousel (un nom par ligne)"
              placeholder="image1.png&#10;image2.png"
            />
          </Field>

          <Field label="Ajouter des images (upload)">
            <input
              type="file"
              name="images"
              multiple
              onChange={(e) => set('_newImages', Array.from(e.target.files))}
              className="admin-input"
              accept="image/*"
              aria-label="Sélectionner des images à uploader"
            />
          </Field>

          <div className="admin-grid-3">
            <Field label="Titre 2">
              <input
                value={form.title2}
                onChange={e => set('title2', e.target.value)}
                className="admin-input"
                aria-label="Titre de la section 2"
              />
            </Field>
            <Field label="Titre 3">
              <input
                value={form.title3}
                onChange={e => set('title3', e.target.value)}
                className="admin-input"
                aria-label="Titre de la section 3"
              />
            </Field>
            <Field label="Titre 4">
              <input
                value={form.title4}
                onChange={e => set('title4', e.target.value)}
                className="admin-input"
                aria-label="Titre de la section 4"
              />
            </Field>
          </div>

          <div className="admin-grid-3">
            <Field label="Paragraphes 2 — un par ligne">
              <textarea
                value={form._p2}
                onChange={e => set('_p2', e.target.value)}
                className="admin-textarea"
                rows={5}
                aria-label="Paragraphes de la section 2 (un par ligne)"
              />
            </Field>
            <Field label="Paragraphes 3 — un par ligne">
              <textarea
                value={form._p3}
                onChange={e => set('_p3', e.target.value)}
                className="admin-textarea"
                rows={5}
                aria-label="Paragraphes de la section 3 (un par ligne)"
              />
            </Field>
            <Field label="Paragraphes 4 — un par ligne">
              <textarea
                value={form._p4}
                onChange={e => set('_p4', e.target.value)}
                className="admin-textarea"
                rows={5}
                aria-label="Paragraphes de la section 4 (un par ligne)"
              />
            </Field>
          </div>

          <div className="admin-grid-2">
            <Field label="Filtres (séparés par des virgules)">
              <input
                value={form._filtres}
                onChange={e => set('_filtres', e.target.value)}
                className="admin-input"
                aria-label="Filtres du projet (séparés par des virgules)"
                placeholder="ex: front, back, webdesign"
              />
            </Field>
            <Field label="Tags (séparés par des virgules)">
              <input
                value={form._tags}
                onChange={e => set('_tags', e.target.value)}
                className="admin-input"
                aria-label="Tags du projet (séparés par des virgules)"
                placeholder="ex: React, Node, MongoDB"
              />
            </Field>
          </div>

          <button
            type="submit"
            className="validate-btn"
            aria-label="Sauvegarder les modifications du projet"
          >
            <FontAwesomeIcon icon={faSave} aria-hidden="true" /> Sauvegarder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
