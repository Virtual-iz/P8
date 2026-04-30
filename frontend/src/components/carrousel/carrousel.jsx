import './Carrousel.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { IMG_URL } from '../../config';

const Carrousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data || !data.pictures || data.pictures.length === 0) {
    return <div>Aucune image disponible</div>;
  }

  const prevSlide = () => {
    setCurrentIndex(prev => prev === 0 ? data.pictures.length - 1 : prev - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => prev === data.pictures.length - 1 ? 0 : prev + 1);
  };

  const showArrows = data.pictures.length > 1;

  return (
    <div className="carrousel">
      <img
        src={`${IMG_URL}/${data.pictures[currentIndex]}`}
        alt={`Vue image n°${currentIndex + 1}`}
      />
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="arrow carrousel-arrow-left"
            aria-label="Image précédente"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={nextSlide}
            className="arrow carrousel-arrow-right"
            aria-label="Image suivante"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      )}
      {showArrows && (
        <span className="carrousel-index">
          {currentIndex + 1}/{data.pictures.length}
        </span>
      )}
    </div>
  );
};

export default Carrousel;
