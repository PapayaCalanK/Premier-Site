// Importation de React pour pouvoir utiliser JSX et autres fonctionnalités React.
import React from 'react';
// Importation du composant SidebarMenu depuis son dossier de définition pour l'utiliser dans ce composant.
import SidebarMenu from '../SidebarMenu/SidebarMenu';
// Importation du fichier CSS spécifique à ce composant pour styler la page d'accueil.
import './Home.css';

// Définition du composant fonctionnel Home.
function Home() {
    // La fonction retourne du JSX, qui décrit la structure UI de la page d'accueil.
    return (
        // Un conteneur div avec la classe "home-container" enveloppe l'ensemble du contenu de la page d'accueil.
        <div className="home-container">
            {/* // Inclusion du composant SidebarMenu pour afficher un menu latéral sur la page. */}
            <SidebarMenu />
            {/* // Un div avec la classe "content" contient le contenu principal de la page. */}
            <div className="content">
                {/* // Titres h1 et h3 pour afficher les messages de bienvenue et une brève introduction au site. */}
                <h1 className="welcome-title">Bienvenue à La Galiote</h1>
                <h3>Le site de gestion de stock des cartouches d'encre du site de Vitry-Sur-Seine</h3>

                {/* // Une section dédiée à la présentation et aux fonctionnalités du site. */}
                <div className="groupe-prenant-section">
                    <p>
                        Ce site permet une gestion efficace et centralisée des cartouches d'encre pour toutes les imprimantes de l'entreprise.
                        Vous pouvez consulter les stocks, gérer les commandes et suivre la consommation en temps réel.
                    </p>
                    <p>
                        Au début du 20e siècle, l'imprimerie industrielle était en plein essor, mais le processus d'impression était souvent laborieux.
                        Les ouvriers imprimaient chaque page manuellement, et une erreur pouvait signifier des heures de travail perdues.
                        L'invention de la presse offset en 1904 a révolutionné l'industrie, en permettant une impression plus rapide, plus précise et moins sujette aux erreurs,
                        contribuant ainsi à la croissance de l'imprimerie industrielle.
                    </p>
                </div>

                <div className="history-section">
                    <p>Dans le monde de l'impression, où la tradition rencontre souvent l'innovation, se trouve une histoire fascinante qui illustre l'esprit pionnier du Groupe Prenant, un nom qui résonne avec distinction dans le secteur de l'imprimerie. Au cœur de cette saga se trouve l'imprimerie La Galiote Prenant, une filiale du groupe, qui a récemment gravé son nom dans l'histoire de l'imprimerie française.
                    </p>
                    <p>
                        Dans un geste audacieux qui témoigne de son engagement envers l'innovation et la différenciation technologique, le Groupe Prenant a introduit en France la première presse nanographique Landa S10P, une prouesse qui a transformé le paysage de l'impression numérique. Cette machine révolutionnaire, synonyme de progrès technologique, incarne la fusion de l'expertise traditionnelle et de la technologie de pointe, positionnant le groupe à l'avant-garde de l'industrie.
                    </p>
                    <p>La Galiote Prenant, fleuron du Groupe Prenant, brille par sa capacité à fusionner le savoir-faire artisanal avec des technologies de pointe. Dotée d'un parc de machines performant, capable de produire plusieurs millions d'exemplaires en des délais records, La Galiote Prenant détient une force industrielle impressionnante. Son stock papier de près de 10.000 tonnes est un témoignage de sa grandeur et de sa capacité à répondre aux demandes les plus exigeantes.</p>
                    <p>Mais au-delà de ces réalisations techniques, c'est la philosophie du Groupe Prenant qui captive et inspire. Sous la direction visionnaire de Laurent Prenant, le groupe incarne une rare combinaison d'innovation audacieuse et de persévérance. "Tout le monde peut proposer des prix bas dans un contexte d’absence de stratégie de développement de l’entreprise... Moins nombreux sont ceux qui risquent l’innovation, l’investissement et la différenciation technologique", affirme Laurent Prenant. Cette citation reflète l'engagement du groupe envers l'excellence, prouvant que la véritable innovation nécessite non seulement de la vision, mais aussi le courage de l'appliquer.</p>
                    <p>En conclusion, l'histoire de la Galiote Prenant au sein du Groupe Prenant n'est pas seulement celle d'une entreprise prospère dans l'imprimerie; c'est une ode à l'innovation, un récit qui inspire et un exemple éclatant de la manière dont la technologie peut être harmonieusement intégrée avec le savoir-faire traditionnel pour créer non seulement des impressions, mais des empreintes indélébiles sur le temps et l'histoire.</p>
                </div>
            </div>
        </div>
    );
}

// Exportation du composant Home pour permettre son utilisation dans d'autres parties de l'application.
export default Home;



// Ce composant est structuré de manière à présenter de manière claire et organisée les informations importantes
// concernant l'entreprise et son approche de la gestion des stocks de cartouches d'encre.
//  La structure du code est simple, rendant le composant facile à comprendre et à maintenir.
//  Les classes CSS utilisées pour styliser les éléments sont définies dans le fichier Home.css,
//  qui doit être cohérent avec les conventions de nommage et les styles définis pour l'ensemble de l'application.