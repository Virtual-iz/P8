import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './Btn.scss';

// Le PDF doit être dans frontend/public/ — Vite sert ce dossier à la racine
const CVBtn = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/virtualiz-cv.pdf';
    link.download = 'virtualiz-cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload} className="social-btn" aria-label="Télécharger le CV">
      <b>CV</b>
      <FontAwesomeIcon icon={faDownload} />
    </button>
  );
};

export default CVBtn;
