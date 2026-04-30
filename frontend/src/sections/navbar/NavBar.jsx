import React, { useState, useEffect } from "react";
import Btn from "../../components/btn/Btn";
import { faHouse, faFingerprint, faBookOpen, faBriefcase, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import './NavBar.scss';

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isHeader, setIsHeader] = useState(true);

  const sections = [
    { id: "home", text: "", icon: faHouse },
    { id: "apropos", text: "A propos", icon: faFingerprint },
    { id: "activites", text: "Activités", icon: faBriefcase },
    { id: "portfolio", text: "Portfolio", icon: faBookOpen },
    { id: "contact", text: "", icon: faEnvelope },
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={isHeader ? "header-menu" : "sticky-menu"}>
      {sections.map(sec => {
        const isActive = activeSection === sec.id;

        // Dans le header, boutons = texte sauf home et contact
        const showText = isHeader && sec.id !== "home" && sec.id !== "contact";

        return (
          <Btn
            key={sec.id}
            text={showText ? sec.text : ""}
            icon={(!showText || sec.id === "home" || sec.id === "contact") ? sec.icon : null}
            isActive={isActive}
            href={`#${sec.id}`}
          />
        );
      })}
    </nav>
  );
};

export default NavBar;