import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bubble.scss";

/**
 * Bubble
 *
 * Changement majeur :
 * - plus d’animation au scroll
 * - animation uniquement au hover
 * - direction conservée (horaire / antihoraire)
 */
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
      {/* roue crantée SVG */}
      <img
        src="/src/assets/img/rouecrantee.svg"
        alt=""
        className="bubble__gear"
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