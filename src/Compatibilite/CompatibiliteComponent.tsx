import React, { useEffect, useState } from 'react';
import { fetchCompatibilites, Compatibilite } from '../api'; // Importe la fonction pour récupérer les données et le type de données.
import './CompatibiliteComponent.css'; // Importe les styles spécifiques à ce composant.

const CompatibiliteComponent = () => {
    const [compatibilites, setCompatibilites] = useState<Compatibilite[]>([]); // Stocke les données de compatibilité.
    const [selectedImprimanteId, setSelectedImprimanteId] = useState<number | null>(null); // Garde l'ID de l'imprimante sélectionnée.
    const [loading, setLoading] = useState<boolean>(true); // Indique si les données sont en cours de chargement.

    useEffect(() => {
        // Charge les données de compatibilité au montage du composant.
        const loadCompatibilites = async () => {
            try {
                const data = await fetchCompatibilites(); // Appel API.
                console.log("Data fetched from API:", data); // Affiche les données récupérées.
                setCompatibilites(data); // Met à jour l'état avec les données récupérées.
                setLoading(false); // Indique la fin du chargement.
            } catch (error) {
                console.error("Error fetching compatibilities:", error); // Gère les erreurs.
                setLoading(false); // Indique la fin du chargement même en cas d'erreur.
            }
        };

        loadCompatibilites(); // Appelle la fonction de chargement des données.
    }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'au montage du composant.

    // Extractions des imprimantes uniques pour éviter les doublons dans la liste.
    const getUniqueImprimantes = () => {
        const uniqueIds = new Set(compatibilites.map(item => item.id_imprimante));
        return Array.from(uniqueIds).map(id => {
            const found = compatibilites.find(item => item.id_imprimante === id);
            return {
                id_imprimante: id,
                modele_imprimante: found ? found.modele_imprimante : 'Modèle inconnu', // Prévoit un cas où le modèle est inconnu.
            };
        });
    };

    const uniqueImprimantes = getUniqueImprimantes(); // Récupère la liste des imprimantes uniques.

    const handleImprimanteSelect = (id_imprimante: number) => {
        setSelectedImprimanteId(id_imprimante); // Met à jour l'imprimante sélectionnée.
    };

    // Filtrage des compatibilités selon l'imprimante sélectionnée.
    const filteredCompatibilites = compatibilites.filter(c => c.id_imprimante === selectedImprimanteId);

    if (loading) {
        return <div>Loading...</div>; // Affiche un message de chargement pendant la récupération des données.
    }

    return (
        <div className="page-container">
            <div className="content">
                <div>
                    <h1 className="welcome-title animate__animated animate__zoomIn">Compatibilité</h1>
                    <ul className="page-list">
                        {uniqueImprimantes.map((imprimante, index) => (
                            <li key={index} onClick={() => handleImprimanteSelect(imprimante.id_imprimante)}>
                                {imprimante.modele_imprimante}
                            </li>
                        ))}
                    </ul>
                    {selectedImprimanteId && (
                        <div>
                            <h2>Cartouches compatibles:</h2>
                            <ul className="page-list">
                                {filteredCompatibilites.map((c, index) => (
                                    <li key={index}>
                                        {`Marque: ${c.marque}, rrf_cla: ${c.rrf_cla}, Couleur: ${c.couleur}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompatibiliteComponent;


// Ce code met en œuvre une approche réactive et dynamique pour afficher les informations de compatibilité,
// améliorant ainsi l'expérience utilisateur en fournissant des interactions intuitives et des retours visuels en temps réel.