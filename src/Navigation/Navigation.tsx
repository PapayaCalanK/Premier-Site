// Importation de React et du Hook useState pour la gestion de l'état local du composant.
import React, { useState } from 'react';
// Importation de Link pour la navigation déclarative entre les composants, et useLocation pour accéder à l'objet de localisation actuelle.
import { Link, useLocation } from 'react-router-dom';
// Importation du WelcomeComponent, qui semble être un composant personnalisé affichant un message de bienvenue et possiblement d'autres fonctionnalités.
import WelcomeComponent from '../WelcomeComposant/WelcomeComponent';

// Définition du composant fonctionnel `Navigation`.
const Navigation = () => {
    // Définition des états locaux pour gérer l'affichage des stocks bas et l'état d'un bouton.
    const [showLowStock, setShowLowStock] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    // Utilisation de useLocation pour accéder à l'objet location qui représente l'URL courante.
    const location = useLocation();

    // Vérification si la page actuelle est la page de consommation en comparant le chemin actuel.
    const isConsommationPage = location.pathname === "/consommation";

    // Définition d'une fonction pour gérer les clics sur le bouton des stocks bas, modifiant les états locaux.
    const handleLowStockClick = () => {
        setShowLowStock(!showLowStock);
        setIsButtonPressed(!isButtonPressed);
    };

    // Le rendu du composant, affichant différents liens basés sur la page actuelle et incluant le WelcomeComponent avec des props.
    return (
        <div className="navigation-container">
            {/* Conditionnelle pour afficher un lien vers la page de consommation si l'utilisateur n'est pas déjà sur cette page. */}
            {!isConsommationPage &&
                <Link to="/consommation" className="btn btn-navigation">Consommation</Link>}
            {/* Conditionnelle pour afficher un lien vers la liste des cartouches si l'utilisateur est sur la page de consommation. */}
            {isConsommationPage &&
                <Link to="/" className="btn btn-navigation">Liste des Cartouches</Link>}
            {/* Inclusion du WelcomeComponent, passant la fonction de gestion du clic et l'état du bouton comme props. */}
            <WelcomeComponent
                onButtonClick={handleLowStockClick}
                isButtonPressed={isButtonPressed}
            />
        </div>
    );
};

// Exportation du composant `Navigation` pour son utilisation dans d'autres parties de l'application.
export default Navigation;



// Ce composant utilise des conditions pour afficher différents éléments Link en fonction de la page actuelle,
//  ce qui permet une navigation dynamique au sein de l'application.
//  Le WelcomeComponent est inclus avec des props pour gérer des interactions spécifiques, telles que le clic sur un bouton,
//  illustrant comment les composants peuvent communiquer entre eux via des props.






