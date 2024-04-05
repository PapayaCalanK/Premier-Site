// Importe React pour utiliser les fonctionnalités de React.
import React from 'react';
// Importe animate.css pour utiliser des animations prédéfinies sur les éléments du composant.
import 'animate.css';
// Importe les styles globaux de l'application. Assurez-vous que ce fichier contient les styles nécessaires pour ce composant.
import '../App.css';

// Définition de l'interface des props attendues par WelcomeComponent.
interface WelcomeComponentProps {
    onButtonClick: () => void; // Cette prop est une fonction qui sera exécutée lors du clic sur le bouton.
    isButtonPressed: boolean; // Cette prop est un booléen indiquant si le bouton a été pressé.
}

// Déclaration du composant fonctionnel WelcomeComponent qui accepte les props définies ci-dessus.
function WelcomeComponent({ onButtonClick, isButtonPressed }: WelcomeComponentProps) {
    // Rendu du composant.
    return (
        // Conteneur principal du composant.
        <div className="container">
            {/* // Titre du composant avec animation de zoom à l'entrée grâce à animate.css. */}
            <h1 className="welcome-title animate__animated animate__zoomIn">Cartouches</h1>
            {/* // Bouton qui, lorsqu'il est cliqué, exécute la fonction onButtonClick passée en prop. */}
            {/* // Le style du bouton change en fonction de l'état isButtonPressed grâce à l'application conditionnelle de classe. */}
            <button
                className={`btn btn-success ${isButtonPressed ? 'btn-pressed' : ''}`}
                onClick={onButtonClick}
            >
                Stock Faible
            </button>
        </div>
    );
}

// Exportation du composant pour permettre son utilisation dans d'autres parties de l'application.
export default WelcomeComponent;


// Ce composant illustre l'utilisation des props pour configurer son comportement et son apparence,
//  l'application conditionnelle des classes CSS, et l'intégration d'animations externes via animate.css.
//  Le style spécifique btn-pressed doit être défini dans vos fichiers CSS pour visualiser l'effet du bouton pressé.