// Importation des hooks et des composants nécessaires de React et react-router-dom.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Importation du fichier CSS pour styliser le menu latéral.
import './SidebarMenu.css';

// Définition du composant fonctionnel `SidebarMenu`.
function SidebarMenu() {
    // Utilisation du hook useState pour gérer l'état d'ouverture (visible ou non) du menu.
    const [isOpen, setIsOpen] = useState(false);

    // Le rendu du composant.
    return (
        // Conteneur principal du menu latéral.
        <div className="sidebar-menu">
            {/* // Titre du menu qui, lorsqu'il est cliqué, inverse l'état d'ouverture grâce à setIsOpen. */}
            <div className="menu-title" onClick={() => setIsOpen(!isOpen)}>
                Menu
            </div>
            {/* // Conditionnellement, si isOpen est vrai, affiche la liste des liens de navigation. */}
            {isOpen && (
                <ul className="sidebar-menu-list"> {/* Ajout du className ici */}
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/cartouches">Cartouches</Link></li>
                    <li><Link to="/consommation">Consommation</Link></li>
                    <li><Link to="/imprimantes">Imprimantes</Link></li>
                    <li><Link to="/compatibilite">Compatibilité</Link></li>
                    <li><Link to="/services">Services</Link></li>
                </ul>
            )}
        </div>
    );
}

// Exportation du composant `SidebarMenu` pour son utilisation dans d'autres parties de l'application.
export default SidebarMenu;


// Ce composant démontre comment utiliser le hook useState pour contrôler l'affichage d'un menu basé sur une action utilisateur (dans ce cas, un clic).
//  Le composant Link de react-router-dom est utilisé pour naviguer de manière déclarative entre les différentes pages de l'application sans recharger
//  la page, offrant une expérience utilisateur fluide et réactive. Le style et l'apparence du menu peuvent être personnalisés via le fichier CSS importé.








