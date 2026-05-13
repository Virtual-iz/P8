import './Logo.scss';
import logoImage from "../../assets/img/virtualiz-logo.webp";

const Logo = () => { 
  return (
    <h1 className='virtualizlogo'>
      <img src={logoImage} alt="Logo Virtualiz" width="200" height="80" />
    </h1>
  );
};

export default Logo;