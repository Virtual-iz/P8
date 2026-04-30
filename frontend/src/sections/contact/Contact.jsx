import { useState } from 'react';
import './Contact.scss';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import ValidateBtn from '../../components/btn/ValidateBtn';
import Message from '../../components/form/Message';
import { API_URL } from '../../config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList, faCalendarDays, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

/**
 * IMAGE CARTE
 */
import carteGrenoble from '../../assets/img/img-carte-grenoble.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    deadline: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erreur lors de l'envoi");
        return;
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        service: '',
        deadline: '',
        message: ''
      });

    } catch {
      setError('Impossible de joindre le serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className='sectiontitle'>
        <h2>CONTACT</h2>
        <div className='yellowline'></div>
      </div>

      {/* =========================
          CONTENEUR SUPERPOSITION
          ========================= */}
      <div className="contact-wrapper">

        {/* CARTE EN FOND */}
        <div className="contact-map">
          <img src={carteGrenoble} alt="Carte Grenoble" />
        </div>

        {/* FORMULAIRE AU-DESSUS */}
        <form onSubmit={handleSubmit} className="contact-form">

          <article>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </article>

          <article className='grid col2'>
            <div className="form-group">
              <label htmlFor="service">
                Prestation <FontAwesomeIcon icon={faTableList} />
              </label>
              <Select name="service" value={formData.service} onChange={handleChange} required>
                <option value="">Que souhaitez-vous ?</option>
                <option value="web">Développement Web</option>
                <option value="photo">Photographie</option>
                <option value="video">Montage Vidéo</option>
                <option value="design">Design Graphique</option>
              </Select>
            </div>

            <div className="form-group">
              <label htmlFor="deadline">
                Délais <FontAwesomeIcon icon={faCalendarDays} />
              </label>
              <Select name="deadline" value={formData.deadline} onChange={handleChange} required>
                <option value="">Pour quand ?</option>
                <option value="unknown">Je ne sais pas</option>
                <option value="1week">1 semaine</option>
                <option value="2weeks">2 semaines</option>
                <option value="1month">1 mois</option>
                <option value="more">+ d'un mois</option>
              </Select>
            </div>
          </article>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-component"
              rows="5"
              required
            />
          </div>

          {error && <Message type="error">{error}</Message>}
          {success && <Message type="success">Votre message a bien été envoyé !</Message>}

          <ValidateBtn type="submit" disabled={loading}>
            {loading ? 'Envoi...' : <> Envoyer <FontAwesomeIcon icon={faPaperPlane} /></>}
          </ValidateBtn>

        </form>
      </div>
    </section>
  );
};

export default Contact;