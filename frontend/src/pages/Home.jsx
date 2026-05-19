import { useState } from 'react';
import Header from '../sections/header/Header';
import NavBar from '../sections/navbar/NavBar';
import About from '../sections/about/About';
import Services from '../sections/services/Services';
import Portfolio from '../sections/portfolio/Portfolio';
import Process from '../sections/process/Process';
import Contact from '../sections/contact/Contact';
import Footer from '../sections/footer/Footer';
import '../App.scss';

const getValidToken = () => {
  const token = localStorage.getItem('admin_token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (Date.now() >= payload.exp * 1000) {
      localStorage.removeItem('admin_token');
      return null;
    }
    return token;
  } catch {
    localStorage.removeItem('admin_token');
    return null;
  }
};

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(!!getValidToken());

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAdmin(false);
  };

  return (
    <main>
      <NavBar />
      <Header isAdmin={isAdmin} onLogout={handleLogout} />
      <About />
      <Services />
      <Portfolio isAdmin={isAdmin} />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
