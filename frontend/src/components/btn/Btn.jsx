import './Btn.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Btn = ({ text, icon, isActive, href }) => {
  const classes = `btn ${isActive ? "active" : ""} ${icon ? "icon" : "text"}`;
  return (
    <a href={href} className={classes}>
      {icon ? <FontAwesomeIcon icon={icon} /> : text}
    </a>
  );
};

export default Btn;