import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../sections/header/Header';
import NavBar from '../sections/navbar/NavBar';
import About from '../sections/about/About';
import Services from '../sections/services/Services';
import Portfolio from '../sections/portfolio/Portfolio';
import Process from '../sections/process/Process';
import Contact from '../sections/contact/Contact';
import Footer from '../sections/footer/Footer';
import AdminLogin from '../components/adminlogin/AdminLogin';
import '../App.scss';

/**
 * Page d'accueil — gère l'état de connexion admin
 * et orchestre toutes les sections.
 */
const Home = () => {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('admin_token'));
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('admin_token', token);
    setIsAdmin(true);
    setIsAdminOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAdmin(false);
  };

  return (
    <main>
      <Helmet>
        {/* --- Balises meta de base --- */}
        <title>Portfolio - Développeuse Full Stack & Photographe | VirtualIZ</title>
        <meta name="description" content="Portfolio professionnel présentant mes compétences en développement web (React, Node.js), design graphique et photographie. Découvrez mes projets et réalisations." />
        <meta name="keywords" content="développeuse web, portfolio, photographie, design graphique, React, Node.js, frontend, backend, full stack, freelance, création site web, application web, SEO, accessibilité" />
        <meta name="author" content="VirtualIZ" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />

        {/* --- Favicon --- */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

        {/* --- Open Graph (Facebook, LinkedIn) --- */}
        <meta property="og:title" content="Portfolio - Développeuse Full Stack & Photographe" />
        <meta property="og:description" content="Portfolio professionnel présentant mes compétences en développement web, design graphique et photographie." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://virtual-iz.fr/" />
        <meta property="og:image" content="https://virtual-iz.fr/img/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Portfolio - VirtualIZ" />
        <meta property="og:locale" content="fr_FR" />

        {/* --- Twitter Card --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio - Développeuse Full Stack & Photographe" />
        <meta name="twitter:description" content="Portfolio professionnel présentant mes compétences en développement web, design graphique et photographie." />
        <meta name="twitter:image" content="https://virtual-iz.fr/img/og-image.jpg" />

        {/* --- Schema.org (Rich Snippets) --- */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "VirtualIZ",
              "url": "https://virtual-iz.fr",
              "description": "Développeuse Full Stack et Photographe professionnelle. Création de sites web sur mesure, design graphique et photographie.",
              "image": "https://virtual-iz.fr/img/og-image.jpg",
              "sameAs": [
                "https://linkedin.com/in/virtual-iz/",
                "https://github.com/Virtual-iz/",
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Développeuse Full Stack"
              },
              "knowsAbout": [
                "Développement Web",
                "React",
                "Node.js",
                "MongoDB",
                "Photographie",
                "Design Graphique",
                "SEO",
                "Accessibilité Web",
                "UI/UX Design"
              ],
              "address": {
                "@type": "Grenoble",
                "addressLocality": "Grenoble",
                "addressRegion": "Auvergne Rhone Alpes",
                "addressCountry": "France"
              }
            }
          `}
        </script>

        {/* --- Robots --- */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />

        {/* --- Autres --- */}
        <meta name="apple-mobile-web-app-title" content="Portfolio" />
        <meta name="application-name" content="Portfolio - VirtualIZ" />
      </Helmet>

      <NavBar />
      
      <Header
        openModal={() => setIsAdminOpen(true)}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      <About />
      <Services />
      <Portfolio isAdmin={isAdmin} />
      <Process />
      <Contact />
      <Footer />

      <AdminLogin
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onLogin={handleLogin}
      />
    </main>
  );
};

export default Home;
