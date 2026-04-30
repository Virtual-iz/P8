import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.scss';

/**
 * Composant racine de l'application.
 * Gère le routage et les pages principales.
 * Note : Pas de page 404 séparée car :
 * - Ce site est un SPA (Single Page Application)
 * - Toutes les routes inexistantes sont gérées par le frontend
 * - Le serveur (Infomaniak) doit être configuré pour renvoyer index.html pour toutes les routes
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Pas de page 404 : le frontend gère les routes inexistantes via Home */}
      </Routes>
    </Router>
  );
};

export default App;