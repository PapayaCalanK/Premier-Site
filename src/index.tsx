// Importation des modules React nécessaires
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importation des styles CSS globaux
import './index.css';

// Importation du composant principal de l'application
import App from './App';

// Importation de la fonction pour rapporter les indicateurs de performances web
import reportWebVitals from './reportWebVitals';

// Importation des styles Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importation des styles d'animation
import 'animate.css';

// Utilisation d'une assertion de type pour s'assurer que l'élément existe
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

// Rendu du composant principal de l'application dans le DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mesure des performances (décommentez la ligne suivante pour activer)
reportWebVitals(console.log);
