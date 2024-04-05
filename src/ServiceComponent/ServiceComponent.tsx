// Importation des hooks et styles nécessaires.
import React, { useEffect, useState } from 'react';
import { fetchServices, Service as ServiceType, fetchUtilisations, Utilisation } from '../api';
import './ServiceComponent.css';

// Déclaration du composant fonctionnel `ServiceComponent`.
const ServiceComponent = () => {
    // État pour stocker la liste des services et des utilisations récupérées via l'API.
    const [services, setServices] = useState<ServiceType[]>([]);
    const [utilisations, setUtilisations] = useState<Utilisation[]>([]);
    // État pour le service actuellement sélectionné.
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
    // Indicateur de chargement pour gérer l'affichage pendant la récupération des données.
    const [loading, setLoading] = useState<boolean>(true);

    // Utilisation de `useEffect` pour charger les données des services et des utilisations au montage du composant.
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Récupération des données depuis l'API et mise à jour de l'état.
                const servicesData = await fetchServices();
                const utilisationsData = await fetchUtilisations();
                setServices(servicesData);
                setUtilisations(utilisationsData);
            } catch (error) {
                // Gestion des erreurs de récupération des données.
                console.error('Error loading data:', error);
            } finally {
                setLoading(false); // Arrêt de l'indicateur de chargement une fois les données récupérées ou en cas d'erreur.
            }
        };

        loadData();
    }, []);

    // Fonction pour gérer la sélection d'un service.
    const handleServiceSelect = (serviceId: number) => {
        // Trouve le service sélectionné par son id et met à jour l'état correspondant.
        const selectedService = services.find(service => service.id === serviceId) || null;
        setSelectedService(selectedService);
    };

    // Filtrage des utilisations en fonction du service sélectionné.
    const filteredUtilisations = selectedService
        ? utilisations.filter(utilisation => utilisation.id_service === selectedService.id)
        : [];

    // Affichage d'un message de chargement pendant la récupération des données.
    if (loading) {
        return <div>Loading...</div>;
    }

    // Rendu du composant : liste des services et détails des utilisations filtrées.
    return (
        <div className="service-page-container">
            <h1 className="welcome-title animate__animated animate__zoomIn">Service</h1>
            <div className="service-list">
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`service-item ${selectedService && selectedService.id === service.id ? "selected" : ""}`}
                    >
                        {service.nom_service}
                    </button>
                ))}
            </div>
            {selectedService && (
                <div className="service-details">
                    <h2>Cartouches consommées:</h2>
                    <ul>
                        {filteredUtilisations.map((utilisation) => (
                            <li key={utilisation.id}>
                                {`Marque: ${utilisation.marque}, Ref: ${utilisation.rrf_cla}, Couleur: ${utilisation.couleur}, Quantité: ${utilisation.quantite_utilise}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// Exportation du composant pour son utilisation dans d'autres parties de l'application.
export default ServiceComponent;


// Ce composant illustre bien l'utilisation des hooks React pour gérer l'état local et les effets de bord,
// ainsi que l'interaction avec une API externe pour récupérer et afficher des données dynamiques.
// La logique de sélection et de filtrage permet une interaction utilisateur riche, rendant l'interface plus interactive et informative.