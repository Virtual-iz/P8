import './Header.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import Logo from '../../components/logo/Logo';
import CvBtn from '../../components/btn/CvBtn';
import SocialBtn from '../../components/btn/SocialBtn';
import profilPic from "../../assets/img/profil-pic-virtualiz.jpg";

const Header = ({ openModal, isAdmin, onLogout }) => {
  return (
    <header id="home">

      <div className='home-content'>

        <article className='titre-et-accroche'>
          <div className="titre-site">
            <Logo />
            <h2>
              <span>Web</span>
              <span>Design</span>
              <span>Dev</span>
            </h2>
          </div>
          <div className="accroche">
            <p>
              Conception et developpement de site web à Grenoble <br />
              Communication sur tous supports!
            </p>
            <div>
              <CvBtn />
              <SocialBtn icon={faLinkedinIn} link="https://www.linkedin.com/in/virtual-iz/" />
            </div>
          </div>
        </article>

        <article className="profilpic">

          {/* Bouton admin */}
          <button
            className={`admin-btn ${isAdmin ? 'admin-btn--connected' : ''}`}
            onClick={isAdmin ? onLogout : openModal}
            title={isAdmin ? 'Se déconnecter' : 'Espace admin'}
          >
            <FontAwesomeIcon icon={faUserLock} />
            {isAdmin && <span className="admin-btn__label">x</span>}
          </button>

          {/*
            Blob scalable : l'image ET le clipPath sont dans le même SVG avec un viewBox commun. SVG caché + clip-path CSS en coordonnées absolues.
          */}
          <svg
            viewBox="0 0 350 350"
            xmlns="http://www.w3.org/2000/svg"
            className="blob-svg"
            role="img"
            aria-labelledby="profil-title"
          >
            <title id="profil-title">Photo de profil VirtualIZ</title>
            <defs>
              <clipPath id="blob-clip">
                <path
                  transform="translate(175,175) scale(2.1)"
                  d="M44.7,-72.6C58.9,-69.2,72.1,-59.2,73.7,-46C75.3,-32.8,65.3,-16.4,62,-1.9C58.7,12.6,62.2,25.3,59.7,36.9C57.3,48.6,48.8,59.3,37.9,65.2C26.9,71.1,13.5,72.3,3.8,65.7C-5.9,59.2,-11.8,44.9,-20.9,37.9C-30,30.9,-42.3,31.2,-50.3,26.1C-58.3,21,-62,10.5,-57.6,2.5C-53.2,-5.4,-40.8,-10.9,-33.5,-17.2C-26.2,-23.6,-24.1,-30.9,-19.4,-39.7C-14.7,-48.6,-7.3,-59,4,-65.8C15.2,-72.7,30.5,-76,44.7,-72.6Z"
                />
              </clipPath>
            </defs>
            {/* preserveAspectRatio="xMidYMid slice" : équivalent object-fit: cover */}
            <image
              href={profilPic}
              x="0" y="0"
              width="350" height="350"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#blob-clip)"
            />
          </svg>

        </article>

      </div>

    </header>
  );
};

export default Header;
