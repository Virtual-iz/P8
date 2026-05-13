import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bubble.scss";
import rouecranteeUrl from "../../assets/img/rouecrantee.svg";

const Bubble = ({
  icon,
  text,
  className = "",
  direction = "clockwise"
}) => {
  return (
    <div
      className={`
        bubble
        ${direction === "counter" ? "bubble--counter" : ""}
        ${className}
      `}
    >
      <img
        src={rouecranteeUrl}
        alt=""
        className="bubble__gear"
        loading="lazy"
      />

      {/* contenu fixe */}
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="bubble__icon"
        />
      )}

      <p>{text}</p>
    </div>
  );
};

export default Bubble;