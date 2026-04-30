import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Btn.scss';

const SocialBtn = ({ icon, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
};

export default SocialBtn;