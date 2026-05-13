import './Footer.scss';
import Logo from '../../assets/img/virtualiz-logo.webp';
import CvBtn from '../../components/btn/CvBtn';
import SocialBtn from '../../components/btn/SocialBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      {/* Définition du clipPath — position:absolute pour sortir du flux et éviter le gap beige */}
      <svg width="0" height="0" className="footer-clippath" aria-hidden="true">
        <defs>
          <clipPath id="footerWave" clipPathUnits="objectBoundingBox">
            <path d="M0,0.2 C0.25,-0.1 0.75,0.5 1,0.2 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <footer className="footer">
        <CvBtn />
        <div className="footer__center">
          <FontAwesomeIcon icon={faAnglesLeft} aria-hidden="true" />
          <span>@</span>
          <img src={Logo} className="logo" alt="logo virtualiz" width="200" height="80" />
          <span>2026</span>
          <FontAwesomeIcon icon={faAnglesRight} aria-hidden="true" />
        </div>
        <SocialBtn
          icon={faLinkedinIn}
          link="https://www.linkedin.com/in/virtual-iz/"
          label="LinkedIn"
        />
      </footer>
    </>
  );
};

export default Footer;