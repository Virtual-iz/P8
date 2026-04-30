import './Logo.scss';
import logoImage from "../../assets/img/virtualiz-logo.png";

const Logo = () => { // Supprimez la prop `logo` si vous utilisez directement l'image importée
  return (
    <div className='virtualizlogo'>
      <img src={logoImage} alt="Logo Virtualiz" />
    </div>
  );
};

export default Logo;