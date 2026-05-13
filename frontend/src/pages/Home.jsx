import { useState, lazy, Suspense } from 'react';
import Header from '../sections/header/Header';
import NavBar from '../sections/navbar/NavBar';
import About from '../sections/about/About';
import Services from '../sections/services/Services';
import Portfolio from '../sections/portfolio/Portfolio';
import Process from '../sections/process/Process';
import Contact from '../sections/contact/Contact';
import Footer from '../sections/footer/Footer';
import '../App.scss';

// Chargé uniquement si l'utilisateur ouvre la modale admin
const AdminLogin = lazy(() => import('../components/adminlogin/AdminLogin'));


const Home = () => {
  const [isAdmin, setIsAdmin]       = useState(!!localStorage.getItem('admin_token'));
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

      {isAdminOpen && (
        <Suspense fallback={null}>
          <AdminLogin
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            onLogin={handleLogin}
          />
        </Suspense>
      )}
    </main>
  );
};

export default Home;
