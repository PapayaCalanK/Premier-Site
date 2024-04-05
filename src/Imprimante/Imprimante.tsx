// Importe React, les hooks useEffect et useState pour gérer l'état du composant et les effets de bord.
import React, { useEffect, useState } from 'react';
// Importe une fonction pour récupérer les données des imprimantes et le type associé à une imprimante depuis un module d'API externe.
import { fetchImprimantes, Imprimante as ImprimanteType } from '../api';
// Importe le fichier CSS pour styliser le composant.
import './Imprimante.css';

// Définit le composant fonctionnel `Imprimante`.
const Imprimante = () => {
    // Utilise useState pour initialiser le tableau d'imprimantes et un indicateur de chargement.
    const [imprimantes, setImprimantes] = useState<ImprimanteType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Utilise useEffect pour exécuter du code au montage du composant. Cela récupère la liste des imprimantes depuis l'API.
    useEffect(() => {
        // Définit une fonction asynchrone pour obtenir les données des imprimantes.
        const getImprimantes = async () => {
            setLoading(true); // Active l'indicateur de chargement.
            try {
                // Tente de récupérer les données des imprimantes en utilisant la fonction importée.
                const data = await fetchImprimantes();
                setImprimantes(data); // Met à jour l'état avec les données récupérées.
            } catch (error) {
                // Affiche une erreur dans la console si la récupération échoue.
                console.error('Error fetching imprimantes:', error);
            } finally {
                setLoading(false); // Désactive l'indicateur de chargement une fois la récupération terminée.
            }
        };

        getImprimantes(); // Appelle la fonction pour obtenir les données des imprimantes.
    }, []); // Le tableau de dépendances vide signifie que l'effet s'exécutera une seule fois après le premier rendu.

    // Affiche un message de chargement si les données sont en cours de récupération.
    if (loading) {
        return <div>Loading...</div>;
    }

    // Rendu du composant : affiche le titre, une introduction historique sur les imprimantes à jet d'encre, et la liste des imprimantes récupérées.
    return (
        <div className="imprimante-container">
            <h1 className="welcome-title animate__animated animate__zoomIn">Imprimantes</h1>
            <div className="content">
                <h2>Liste des imprimantes</h2>
                <p>Dans les années 1990, les imprimantes à jet d'encre étaient souvent vendues à des prix très bas, parfois même en dessous de leur coût de fabrication. Les fabricants comptaient sur la vente de cartouches d'encre pour réaliser des bénéfices, créant ainsi un modèle économique où les cartouches d'encre étaient plus lucratives que les imprimantes elles-mêmes.</p>
                <ul className="page-list">
                    {imprimantes.map((imprimante) => (
                        <li key={imprimante.id}>
                            {imprimante.marque_imprimante} - {imprimante.modele_imprimante} ({imprimante.type_imprimante})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Exporte le composant pour permettre son utilisation dans d'autres parties de l'application.
export default Imprimante;


// Ce composant illustre plusieurs concepts clés de React et des patterns courants,
//  notamment la gestion de l'état, les effets de bord, et la récupération de données asynchrones.
//   Il montre aussi comment mapper sur un tableau d'objets pour générer des éléments de liste dynamiques dans le JSX.






