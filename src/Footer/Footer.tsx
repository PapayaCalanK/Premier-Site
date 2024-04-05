// Importe le fichier CSS spécifique au composant Footer pour appliquer le style. Assurez-vous que le chemin vers le fichier CSS est correct.
import './Footer.css';

// Définition du composant fonctionnel Footer. Ce composant ne reçoit pas de props et retourne un élément de pied de page.
const Footer = () => {
    // Retourne l'élément JSX du composant. Le JSX permet de décrire l'UI du composant dans une syntaxe proche de HTML.
    return (
        // Utilisation de la balise <footer> pour définir la section de pied de page du composant.
        <footer>
            {/* // Affiche un paragraphe avec le texte des droits réservés. Utilise l'objet Date de JavaScript et sa méthode getFullYear() pour obtenir l'année courante et l'afficher dynamiquement. */}
            <p>Tous droits réservés - La Galiote Prenant - {new Date().getFullYear()}</p>
        </footer>
    );
};

// Exporte le composant Footer pour permettre son utilisation dans d'autres parties de l'application.
export default Footer;


// Ce code définit un composant Footer simple qui affiche un message de droits d'auteur avec l'année courante.
// Il utilise les fonctionnalités de base de React et TypeScript pour créer un composant fonctionnel sans état.
// N'oubliez pas de vérifier le chemin d'accès au fichier CSS pour vous assurer que le style du pied de page est correctement appliqué.