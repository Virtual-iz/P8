import './Footer.scss';
import Logo from '../../assets/img/virtualiz-logo.png';
import CvBtn from '../../components/btn/CvBtn';
import SocialBtn from '../../components/btn/SocialBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faUserLock, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      {/* Définition du clipPath */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="footerWave" clipPathUnits="objectBoundingBox">
            <path d="M0,0.2 C0.25,-0.1 0.75,0.5 1,0.2 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <footer className="footer">
        <CvBtn />
        <FontAwesomeIcon icon={faAnglesLeft} />
        <span>@</span>
        <img src={Logo} className="logo" alt="logo virtualiz" />
        <span>2026</span>
        <FontAwesomeIcon icon={faAnglesRight} />
        <SocialBtn 
          icon={faLinkedinIn} 
          link="https://www.linkedin.com/in/virtual-iz/" 
        />
      </footer>
    </>
  );
};

export default Footer;