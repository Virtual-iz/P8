import './Btn.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Btn = ({ text, icon, isActive, href, ariaLabel }) => {
  const classes = `btn ${isActive ? "active" : ""} ${icon ? "icon" : "text"}`;
  return (
    <a href={href} className={classes} aria-label={icon ? ariaLabel : undefined}>
      {icon ? <FontAwesomeIcon icon={icon} aria-hidden="true" /> : text}
    </a>
  );
};

export default Btn;