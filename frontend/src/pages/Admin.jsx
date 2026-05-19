import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import Input from '../components/form/Input';
import ValidateBtn from '../components/btn/ValidateBtn';
import './Admin.scss';

const Admin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      localStorage.setItem('admin_token', data.token);
      navigate('/');
    } catch {
      setError('Impossible de joindre le serveur. Vérifiez que le backend est lancé.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-page__card">
        <form onSubmit={handleSubmit}>
          <h1>Administration</h1>

          <div className="form-group">
            <label htmlFor="admin-id">Identifiant</label>
            <Input
              id="admin-id"
              type="text"
              name="admin-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
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
            />
          </div>

          {error && <p className="error-message" role="alert">{error}</p>}

          <ValidateBtn type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </ValidateBtn>
        </form>
      </div>
    </main>
  );
};

export default Admin;
