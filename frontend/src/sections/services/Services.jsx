import './Services.scss';
import { useEffect, useRef, useState } from 'react';
import PercentLine from '../../components/percent/PercentLine';
import PercentRound from '../../components/percent/PercentRound';
import { faCode, faServer, faPalette, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Section "Activités" de la page d'accueil.
 * Affiche les compétences sous forme de pourcentages et de catégories.
 */
const Services = () => {
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
    <section id="activites" ref={sectionRef} aria-label="Compétences et services">
      <div className="sectiontitle">
        <h2>COMPETENCES</h2>
        <div className="yellowline" aria-hidden="true"></div>
      </div>

      <div className="skills-container">
        {/* Frontend */}
        <article className="skills-list" aria-labelledby="frontend-title">
          <h3 id="frontend-title" className="sr-only">Frontend</h3>
          <PercentRound value={75} icon={faCode} isVisible={isVisible} aria-label="Frontend : 75%" />
          <span>75%</span>
          <h4>Frontend</h4>

          <div>
            <div className="skill-title">
              <strong>HTML5</strong>
              <span>90%</span>
            </div>
            <PercentLine value={90} isVisible={isVisible} aria-label="HTML5 : 90%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>CSS3/Scss</strong>
              <span>85%</span>
            </div>
            <PercentLine value={85} isVisible={isVisible} aria-label="CSS3/Scss : 85%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>Javascript</strong>
              <span>50%</span>
            </div>
            <PercentLine value={50} isVisible={isVisible} aria-label="Javascript : 50%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>React</strong>
              <span>75%</span>
            </div>
            <PercentLine value={75} isVisible={isVisible} aria-label="React : 75%" />
          </div>
        </article>

        {/* Backend */}
        <article className="skills-list" aria-labelledby="backend-title">
          <h3 id="backend-title" className="sr-only">Backend</h3>
          <PercentRound value={62} icon={faServer} isVisible={isVisible} aria-label="Backend : 62%" />
          <span>62%</span>
          <h4>Backend</h4>

          <div>
            <div className="skill-title">
              <strong>Node.js</strong>
              <span>50%</span>
            </div>
            <PercentLine value={50} isVisible={isVisible} aria-label="Node.js : 50%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>Express</strong>
              <span>60%</span>
            </div>
            <PercentLine value={60} isVisible={isVisible} aria-label="Express : 60%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>MongoDB</strong>
              <span>80%</span>
            </div>
            <PercentLine value={80} isVisible={isVisible} aria-label="MongoDB : 80%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>API REST</strong>
              <span>60%</span>
            </div>
            <PercentLine value={60} isVisible={isVisible} aria-label="API REST : 60%" />
          </div>
        </article>

        {/* Communication Visuelle */}
        <article className="skills-list" aria-labelledby="comvis-title">
          <h3 id="comvis-title" className="sr-only">Com Visuelle</h3>
          <PercentRound value={88} icon={faPalette} isVisible={isVisible} aria-label="Communication Visuelle : 88%" />
          <span>88%</span>
          <h4>Com Visuelle</h4>

          <div>
            <div className="skill-title">
              <strong>Figma</strong>
              <span>85%</span>
            </div>
            <PercentLine value={85} isVisible={isVisible} aria-label="Figma : 85%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>Responsive</strong>
              <span>85%</span>
            </div>
            <PercentLine value={85} isVisible={isVisible} aria-label="Responsive : 85%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>Photographie</strong>
              <span>99%</span>
            </div>
            <PercentLine value={99} isVisible={isVisible} aria-label="Photographie : 99%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>Montage vidéo</strong>
              <span>85%</span>
            </div>
            <PercentLine value={85} isVisible={isVisible} aria-label="Montage vidéo : 85%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>Affinity/Canva</strong>
              <span>85%</span>
            </div>
            <PercentLine value={85} isVisible={isVisible} aria-label="Affinity/Canva : 85%" />
          </div>
        </article>

        {/* Outils */}
        <article className="skills-list" aria-labelledby="tools-title">
          <h3 id="tools-title" className="sr-only">Outils</h3>
          <PercentRound value={71} icon={faScrewdriverWrench} isVisible={isVisible} aria-label="Outils : 71%" />
          <span>71%</span>
          <h4>Outils</h4>

          <div>
            <div className="skill-title">
              <strong>Github</strong>
              <span>55%</span>
            </div>
            <PercentLine value={55} isVisible={isVisible} aria-label="Github : 55%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>SEO Audit</strong>
              <span>90%</span>
            </div>
            <PercentLine value={90} isVisible={isVisible} aria-label="SEO Audit : 90%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>Jira</strong>
              <span>60%</span>
            </div>
            <PercentLine value={60} isVisible={isVisible} aria-label="Jira : 60%" />
          </div>
          <div>
            <div className="skill-title">
              <strong>Kanban</strong>
              <span>80%</span>
            </div>
            <PercentLine value={80} isVisible={isVisible} aria-label="Kanban : 80%" />
          </div>
        </article>
      </div>
    </section>
  );
};

export default Services;