import { useState, useEffect, useRef } from 'react';
import Testimony from '../testimony/Testimony';
import './Smallslider.scss';
import { API_URL } from '../../config';

const getVisibleSlides = () => {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

const Smallslider = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/api/testimonies`)
      .then(res => res.json())
      .then(setTestimonies)
      .catch(err => console.error('Erreur chargement témoignages :', err));
  }, []);

  useEffect(() => {
    const handleResize = () => setVisibleSlides(getVisibleSlides());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonies.length - visibleSlides);
  const goToNext = () => setCurrentIndex(prev => prev < maxIndex ? prev + 1 : 0);
  const goToPrev = () => setCurrentIndex(prev => prev > 0 ? prev - 1 : maxIndex);

  const slideWidth = 100 / visibleSlides;

  if (!testimonies.length) return null;

  return (
    <div className="small-slider">
      <div
        className="small-slider__track"
        ref={sliderRef}
        style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
      >
        {testimonies.map((testimony, index) => (
          <div key={index} className="small-slider__slide">
            <Testimony {...testimony} />
          </div>
        ))}
      </div>
      {testimonies.length > visibleSlides && (
        <>
          <button className="small-slider__button small-slider__button--prev" onClick={goToPrev}>
            &#10094;
          </button>
          <button className="small-slider__button small-slider__button--next" onClick={goToNext}>
            &#10095;
          </button>
        </>
      )}
    </div>
  );
};

export default Smallslider;
