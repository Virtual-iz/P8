import { useState } from 'react';
import './AdminLogin.scss';
import Input from '../form/Input';
import ValidateBtn from '../btn/ValidateBtn';
import { API_URL } from '../../config';  // ✅ Chemin corrigé : ../../config (depuis src/components/adminlogin/)

/**
 * Composant AdminLogin.
 * Modale de connexion pour les administrateurs.
 * @param {boolean} isOpen - État d'ouverture de la modale
 * @param {Function} onClose - Fonction pour fermer la modale
 * @param {Function} onLogin - Fonction pour gérer la connexion réussie (remonte le token)
 */
const AdminLogin = ({ isOpen, onClose, onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Gère la soumission du formulaire de connexion.
   * API_URL inclut déjà /api, donc on n'ajoute pas /api dans le chemin.
   * @param {Event} e - Événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Erreur de connexion');
        return;
      }

      onLogin(data.token);
    } catch {
      setError('Impossible de joindre le serveur. Vérifiez que le backend est lancé.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="admin-login-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <div className="admin-login-content">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Fermer la modale de connexion"
        >
          ×
        </button>

        <div className="admin-icon" aria-hidden="true">👤</div>

        <form onSubmit={handleSubmit} aria-labelledby="login-title">
          <h2 id="login-title">Connexion Admin</h2>

          <div className="form-group">
            <label htmlFor="admin-id">Identifiant</label>
            <Input
              id="admin-id"
              type="text"
              name="admin-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              aria-label="Identifiant admin"
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Mot de passe</label>
            <Input
              id="admin-password"
              type="password"
              name="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Mot de passe admin"
            />
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <ValidateBtn
            type="submit"
            disabled={loading}
            aria-label={loading ? 'Connexion en cours' : 'Se connecter'}
          >
            {loading ? 'Connexion...' : 'Connexion'}
          </ValidateBtn>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
