import React, { useEffect, useState } from 'react';
import { fetchUtilisations, fetchServices, Service, Utilisation } from '../api';
import Graphique from '../Graphique/Graphique';
import 'animate.css';
import './Consommation.css';

// Définition du type pour les éléments de données du graphique
interface GraphDataItem {
    name: string; // Nom du service
    consommation: number; // Quantité de cartouches consommées
}

const Consommation = () => {
    const [loading, setLoading] = useState<boolean>(true); // État pour le chargement des données
    const [graphData, setGraphData] = useState<GraphDataItem[]>([]); // État pour les données du graphique

    useEffect(() => {
        const loadData = async () => {
            setLoading(true); // Commence le chargement
            try {
                const servicesData = await fetchServices(); // Récupération des services
                const utilisationsData = await fetchUtilisations(); // Récupération des utilisations

                // Initialisation de la structure pour calculer la consommation par service
                let consommationParService: Record<string, number> = servicesData.reduce((acc: Record<string, number>, service: Service) => {
                    acc[service.nom_service] = 0; // Initialiser chaque service avec une consommation de 0
                    return acc;
                }, {});

                // Mise à jour de la consommation par service avec les données d'utilisation
                utilisationsData.forEach((utilisation: Utilisation) => {
                    if (consommationParService.hasOwnProperty(utilisation.nom_service)) {
                        consommationParService[utilisation.nom_service] += Math.round(utilisation.quantite_utilise);
                    }
                });

                // Conversion de l'objet en tableau pour le graphique
                const formattedGraphData = Object.keys(consommationParService).map(name => ({
                    name, // Nom du service
                    consommation: consommationParService[name] // Quantité consommée
                }));

                setGraphData(formattedGraphData); // Mise à jour de l'état avec les données formatées
            } catch (error) {
                console.error('Error loading data:', error); // Gérer l'erreur en cas de problème
            } finally {
                setLoading(false); // Arrêter le chargement une fois le processus terminé
            }
        };
        loadData(); // Exécuter la fonction de chargement des données
    }, []); // Ce useEffect ne dépend d'aucune variable et ne s'exécute qu'au montage du composant

    if (loading) {
        return <div>Loading...</div>; // Afficher un message de chargement pendant la récupération des données
    }

    return (
        <div className="consommation-container">
            <h1 className="consommation-title animate__animated animate__zoomIn">
                Consommation des Cartouches par Service
            </h1>
            <div className="graph-container">
                <Graphique data={graphData} width={window.innerWidth / 1.2} height={window.innerHeight / 1.6} />
                {/* Le composant Graphique est utilisé pour afficher les données sous forme de graphique */}
            </div>
        </div>
    );
};

export default Consommation;


// Ce code récupère les données de consommation de cartouches par service,
//  les traite pour les mettre dans le format attendu par le composant Graphique,
// et affiche le graphique de la consommation.
// Il gère également l'état de chargement pour afficher un message pendant la récupération des données.






