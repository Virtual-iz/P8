import './Process.scss';
import { useEffect, useRef, useState } from 'react';
import Bubble from "../../components/bubble/Bubble.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faComments,
  faFilePen,
  faCode,
  faGears,
  faCircleCheck,
  faWarehouse,
  faQuoteLeft,
  faQuoteRight
} from "@fortawesome/free-solid-svg-icons";
import Smallslider from "../../components/smallslider/Smallslider";

const Process = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef}>
      <div className='soustitre'>
        <FontAwesomeIcon icon={faGears} aria-hidden="true" />
        <h3>Construction d'un projet</h3>
        <FontAwesomeIcon icon={faGears} aria-hidden="true" />
      </div>

      <article className="grid col3" aria-label="Étapes de construction d'un projet">
        <Bubble
          icon={faLightbulb}
          text="Contactez moi et décrivez moi votre idée."
          isVisible={isVisible}
          direction="clockwise"
        />

        <Bubble
          icon={faComments}
          text="On définit précisément l’identité souhaitée pour le site, votre cible, les besoins techniques immédiats et potentiels."
          isVisible={isVisible}
          direction="counter"
        />

        <Bubble
          icon={faFilePen}
          text="On note tout dans un dossier. Je vous donne un temps estimatif puis travaille sur une maquette à valider"
          isVisible={isVisible}
          direction="clockwise"
        />

        <Bubble
          icon={faWarehouse}
          text="Si vous n’en avez pas déjà, je vous accompagne pour créer les pré-requis : nom de domaine et hébergement du site"
          isVisible={isVisible}
          direction="counter"
        />

        <Bubble
          icon={faCode}
          text="J’entame le développement complet du site. On continue d’échanger et on ajuste si nécessaire"
          isVisible={isVisible}
          direction="clockwise"
        />

        <Bubble
          icon={faCircleCheck}
          text="Votre site est en ligne. Vous conservez précieusement les identifiants pour d'éventuelles modifications futures"
          isVisible={isVisible}
          direction="counter"
        />
      </article>

      <div className='soustitre'>
        <FontAwesomeIcon icon={faQuoteLeft} aria-hidden="true" />
        <h3>Témoignages Clients</h3>
        <FontAwesomeIcon icon={faQuoteRight} aria-hidden="true" />
      </div>

      <Smallslider />
    </section>
  );
};

export default Process;