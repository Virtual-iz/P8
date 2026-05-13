import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Btn.scss';

const SocialBtn = ({ icon, link, label }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn"
      aria-label={label}
    >
      <FontAwesomeIcon icon={icon} aria-hidden="true" />
    </a>
  );
};

export default SocialBtn;