import { useState, useEffect } from "react";
import Btn from "../../components/btn/Btn";
import { faHouse, faFingerprint, faBookOpen, faBriefcase, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import './NavBar.scss';

// Seuil en dessous duquel les boutons texte ne tiennent plus (5 boutons ~420px de nav)
const NARROW_BREAKPOINT = 600;

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isHeader, setIsHeader] = useState(true);
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < NARROW_BREAKPOINT);

  const sections = [
    { id: "home",      text: "",          label: "Accueil",   icon: faHouse },
    { id: "apropos",   text: "A propos",  label: "A propos",  icon: faFingerprint },
    { id: "activites", text: "Activités", label: "Activités", icon: faBriefcase },
    { id: "portfolio", text: "Portfolio", label: "Portfolio", icon: faBookOpen },
    { id: "contact",   text: "",          label: "Contact",   icon: faEnvelope },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.getElementById("home").offsetHeight;
      setIsHeader(window.scrollY < headerHeight);

      let current = "home";
      sections.forEach(sec => {
        const sectionEl = document.getElementById(sec.id);
        if (!sectionEl) return;
        const top = sectionEl.offsetTop - 60;
        if (window.scrollY >= top) current = sec.id;
      });
      setActiveSection(current);
    };

    const handleResize = () => setIsNarrow(window.innerWidth < NARROW_BREAKPOINT);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={isHeader ? "header-menu" : "sticky-menu"}>
      {sections.map(sec => {
        const isActive = activeSection === sec.id;

        // Texte uniquement dans le header, sur écran large,
        // et pour les sections qui ont un label (pas home ni contact)
        const showText = isHeader && !isNarrow && sec.id !== "home" && sec.id !== "contact";

        return (
          <Btn
            key={sec.id}
            text={showText ? sec.text : ""}
            icon={!showText ? sec.icon : null}
            isActive={isActive}
            href={`#${sec.id}`}
            ariaLabel={sec.label}
          />
        );
      })}
    </nav>
  );
};

export default NavBar;
