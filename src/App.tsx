// Importation des dépendances nécessaires, y compris React, react-router-dom, divers composants de page, et le contexte d'authentification.
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import WelcomeComponent from './WelcomeComposant/WelcomeComponent';
import CartoucheList from './CartoucheList/CartoucheList';
import Consommation from './Consommation/Consommation';
import Imprimante from './Imprimante/Imprimante';
import ServiceComponent from './ServiceComponent/ServiceComponent';
// import CompatibilitePage from './Compatibilite/CompatibilitePage';
import CompatibiliteComponent from './Compatibilite/CompatibiliteComponent';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import AdminAccess from './AdminAccess/AdminAccess';
import { AuthProvider } from './AuthContext/AuthContext';
import './App.css';

function App() {
  // Gestion de l'état pour le contrôle de l'affichage des cartouches en faible stock et l'état du bouton pressé.
  const [showLowStock, setShowLowStock] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // Fonction pour gérer le clic sur le bouton lié au stock faible.
  const handleLowStockClick = () => {
    setShowLowStock(!showLowStock);
    setIsButtonPressed(!isButtonPressed);
  };

  return (
    <AuthProvider> {/* Fournit un contexte d'authentification à l'ensemble de l'application. */}
      <Router>
        <div className="App">
          <SidebarMenu /> {/* Menu latéral persistant à travers toutes les pages. */}
          <div className="main-content">
            <Routes> {/* Définition des routes pour le routage des composants/pages. */}
              <Route path="/" element={<Home />} />
              <Route path="/cartouches" element={
                <AdminAccess> {/* Restreint l'accès à certains composants pour les administrateurs uniquement. */}
                  <>
                    <WelcomeComponent onButtonClick={handleLowStockClick} isButtonPressed={isButtonPressed} />
                    <CartoucheList showLowStock={showLowStock} />
                  </>
                </AdminAccess>
              } />
              <Route path="/consommation" element={<Consommation />} />
              <Route path="/imprimantes" element={<Imprimante />} />
              <Route path="/services" element={<ServiceComponent />} />
              {/* La route commentée pourrait être activée si vous souhaitez utiliser CompatibilitePage au lieu de CompatibiliteComponent. */}
              {/* <Route path="/compatibilite" element={<CompatibilitePage />} /> Route pour la page de compatibilité */}
              <Route path="/compatibilite" element={<CompatibiliteComponent />} />
            </Routes>
            <Footer /> {/* Pied de page persistant à travers toutes les pages. */}
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// Ce composant App sert de squelette à votre application, orchestrant le routage entre différentes vues 
// et fournissant un cadre pour l'authentification et la gestion des droits d'accès.
//  L'utilisation de Router permet de naviguer entre les composants sans recharger la page,
//   offrant une expérience utilisateur fluide et moderne. Le composant AuthProvider englobe toute l'application
//    pour assurer que le contexte d'authentification est accessible partout, facilitant la gestion des sessions utilisateur.