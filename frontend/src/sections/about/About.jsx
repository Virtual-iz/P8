import './About.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faBriefcase, faEye, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const About = () => {
    return (
        <section id="apropos">
            <div className='sectiontitle'>
                <h2>A PROPOS</h2>
                <div className='yellowline' aria-hidden="true"></div>
            </div>

            <div className='intro'>
                <article className='roundedyellowframe'>
                    <h3>Prestations</h3>
                    <ul aria-label="Liste des prestations proposées">
                        <li><FontAwesomeIcon icon={faThumbtack} aria-hidden="true" /> sites vitrine</li>
                        <li><FontAwesomeIcon icon={faThumbtack} aria-hidden="true" /> sites wordpress</li>
                        <li><FontAwesomeIcon icon={faThumbtack} aria-hidden="true" /> visuels, brochures, flyers</li>
                        <li><FontAwesomeIcon icon={faThumbtack} aria-hidden="true" /> photos en studio</li>
                        <li><FontAwesomeIcon icon={faThumbtack} aria-hidden="true" /> montage vidéo</li>
                        <li><FontAwesomeIcon icon={faThumbtack} aria-hidden="true" /> ...</li>
                    </ul>
                </article>

                <article className='presentation'>
                    <div>
                        <FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />
                        <p>
                            Photographe indépendante à l’origine, je me suis reconvertie dans le développement web.
                            Mon expérience passée dans le domaine de la communication visuelle s’ajoute à des compétences multi-fonctionnelles.
                        </p>
                    </div>

                    <div>
                        <FontAwesomeIcon icon={faEye} aria-hidden="true" />
                        <p>
                            J’ai toujours apprécié transformer les idées en images. J’aime comprendre l’identité et les valeurs
                            que souhaitent communiquer les entreprises via leurs sites ou supports papier. Concevoir la maquette graphique
                            et la voir prendre forme sur l’écran sont mes étapes préférées. Au-delà du code, ma curiosité pour divers sujets
                            m’a permis de développer une bonne culture.
                        </p>
                    </div>

                    <div>
                        <FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" />
                        <p>
                            <b>Diplôme de photographie, Gobelins l’école de l’image, Paris</b>
                        </p>
                    </div>

                    <div>
                        <FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" />
                        <p>
                            <b>Diplôme développeur full stack, OpenClassrooms</b>
                        </p>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default About;