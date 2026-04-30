
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './Btn.scss';

const CVBtn = () => {
  const handleDownload = () => {
    const pdfPath = '/assets/virtualiz-cv.pdf'; 
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'virtualiz-cv.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload} className="social-btn">

        <b>CV</b>
        <FontAwesomeIcon icon={faDownload} />

    </button>
  );
};

export default CVBtn;