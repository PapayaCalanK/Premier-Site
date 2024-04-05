import axios, { AxiosResponse } from 'axios';

/**
 * Interface décrivant la structure d'une cartouche d'encre.
 * Les propriétés optionnelles sont marquées avec un '?'. 
 */
export interface Cartouche {
    id?: number; // Identifiant unique de la cartouche, optionnel.
    rrf_cla: string; // Référence de la cartouche.
    couleur: string; // Couleur de l'encre de la cartouche.
    image?: string; // URL de l'image de la cartouche, optionnel.
    date_achat: string | null; // Date d'achat de la cartouche, peut être nulle si non spécifiée.
    marque: string; // Marque de la cartouche.
    date_peremption: string | null; // Date de péremption de la cartouche, peut être nulle si non spécifiée.
    ref_const: string; // Référence constructeur de la cartouche.
    quantites: number; // Quantité disponible de la cartouche.
}

// URL de base de l'API pour toutes les requêtes.
const apiBaseURL = 'http://lg-intranet-dev:44312/api';

/**
 * Récupère toutes les cartouches de la base de données.
 * @returns Promesse résolue avec un tableau de cartouches.
 */
export const fetchCartouches = async (): Promise<Cartouche[]> => {
    try {
        const response: AxiosResponse<Cartouche[]> = await axios.get(`${apiBaseURL}/cartouche`);
        return response.data; // Renvoie le tableau de cartouches obtenu de l'API.
    } catch (error) {
        console.error('Error fetching cartouches:', error);
        throw error; // Propage l'erreur pour une gestion ultérieure.
    }
};

/**
 * Récupère une cartouche spécifique par son identifiant.
 * @param id L'identifiant de la cartouche à récupérer.
 * @returns Promesse résolue avec les données de la cartouche spécifiée.
 */
export const fetchCartoucheById = async (id: number): Promise<Cartouche> => {
    try {
        const response: AxiosResponse<Cartouche> = await axios.get(`${apiBaseURL}/cartouche/${id}`);
        return response.data; // Renvoie les données de la cartouche spécifiée.
    } catch (error) {
        console.error(`Error fetching cartouche with id ${id}:`, error);
        throw error;
    }
};

/**
 * Crée une nouvelle cartouche dans la base de données.
 * @param cartoucheData Les données de la nouvelle cartouche à créer.
 * @returns Promesse résolue avec les données de la cartouche créée.
 */
export const createCartouche = async (cartoucheData: Cartouche): Promise<Cartouche> => {
    try {
        const response: AxiosResponse<Cartouche> = await axios.post(`${apiBaseURL}/cartouche`, cartoucheData);
        return response.data; // Renvoie les données de la cartouche créée.
    } catch (error) {
        console.error('Error creating cartouche:', error);
        throw error;
    }
};

/**
 * Met à jour la quantité d'une cartouche spécifique.
 * @param id L'identifiant de la cartouche à mettre à jour.
 * @param nouvelleQuantite La nouvelle quantité à attribuer à la cartouche.
 * @returns Promesse résolue avec les données de la cartouche mise à jour.
 */
export const updateCartoucheQuantite = async (id: number, nouvelleQuantite: number): Promise<Cartouche> => {
    try {
        // Première requête pour récupérer les données actuelles de la cartouche.
        const response2: AxiosResponse<Cartouche> = await axios.get(`${apiBaseURL}/cartouche/${id}`);
        // Mise à jour de la quantité dans l'objet obtenu.
        response2.data.quantites = nouvelleQuantite;
        // Deuxième requête pour mettre à jour la cartouche avec la nouvelle quantité.
        const response: AxiosResponse<Cartouche> = await axios.put(`${apiBaseURL}/cartouche/${id}`, response2.data);
        return response.data; // Renvoie les données de la cartouche mise à jour.
    } catch (error) {
        console.error(`Error updating cartouche quantity with id ${id}:`, error);
        throw error;
    }
};

/**
 * Supprime une cartouche spécifique de la base de données par son identifiant.
 * @param id L'identifiant de la cartouche à supprimer.
 * @returns Promesse résolue sans valeur (action de suppression).
 */
export const deleteCartouche = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${apiBaseURL}/cartouche/${id}`);
    } catch (error) {
        console.error(`Error deleting cartouche with id ${id}:`, error);
        throw error;
    }
};

// Ce code illustre comment interagir avec une API REST pour créer, lire, mettre à jour et supprimer des ressources
//  (dans ce cas, des cartouches d'encre) à l'aide d'Axios, une bibliothèque client HTTP basée sur les promesses.
//   Les fonctions sont asynchrones et utilisent try-catch pour gérer les erreurs potentielles,
//    ce qui est essentiel pour maintenir la robustesse de l'application.


//API compatibilte
// Définition de l'interface Compatibilite qui modélise les données de compatibilité entre une cartouche et une imprimante.
export interface Compatibilite {
    id?: number; // Identifiant unique de la compatibilité, optionnel pour permettre la création de nouvelles entrées sans id pré-assigné.
    id_cartouche: number; // Identifiant de la cartouche concernée.
    marque: string; // Marque de la cartouche.
    rrf_cla: string; // Référence de la cartouche.
    couleur: string; // Couleur de l'encre de la cartouche.
    id_imprimante: number; // Identifiant de l'imprimante concernée.
    marque_imprimante: string; // Marque de l'imprimante.
    modele_imprimante: string; // Modèle de l'imprimante.
    type_imprimante: string; // Type de l'imprimante (peut indiquer si c'est laser, jet d'encre, etc.).
}

// Fonction asynchrone pour récupérer toutes les compatibilités enregistrées dans la base de données.
export const fetchCompatibilites = async (): Promise<Compatibilite[]> => {
    const response = await axios.get<Compatibilite[]>('http://lg-intranet-dev:44312/api/compatibilite');
    return response.data; // Retourne directement les données de compatibilité obtenues de l'API.
};

// Fonction asynchrone pour créer une nouvelle entrée de compatibilité dans la base de données.
export const createCompatibilite = async (compatibiliteData: Compatibilite): Promise<Compatibilite> => {
    const response = await axios.post<Compatibilite>('/compatibilite', compatibiliteData);
    return response.data; // Retourne les données de la nouvelle compatibilité créée.
};

// Fonction asynchrone pour récupérer les données d'une compatibilité spécifique par son identifiant.
export const fetchCompatibiliteById = async (id: number): Promise<Compatibilite> => {
    const response = await axios.get<Compatibilite>(`/compatibilite/${id}`);
    return response.data; // Retourne les données de compatibilité pour l'ID spécifié.
};

// Fonction asynchrone pour supprimer une entrée de compatibilité par son identifiant.
export const deleteCompatibilite = async (id: number): Promise<void> => {
    await axios.delete(`/compatibilite/${id}`); // Effectue la suppression sans retourner de données.
};

// Ce code montre comment interagir avec une API REST pour créer, lire et supprimer des données de compatibilité
//  entre cartouches d'encre et imprimantes.
//   Chaque fonction utilise axios pour effectuer des requêtes HTTP asynchrones et manipuler les données de compatibilité. 
//   L'utilisation d'interfaces TypeScript aide à assurer que les données manipulées dans ces fonctions correspondent au schéma attendu, 
//   renforçant ainsi la sécurité et la robustesse du code.


// * Interface représentant la structure de données pour une imprimante.
export interface Imprimante {
    id: number; // Identifiant unique de l'imprimante.
    marque_imprimante: string; // Marque de l'imprimante.
    type_imprimante: string; // Type de l'imprimante (ex: jet d'encre, laser, etc.).
    description_imprimante: string; // Description détaillée de l'imprimante.
    modele_imprimante: string; // Modèle spécifique de l'imprimante.
}

/**
 * Récupère la liste de toutes les imprimantes disponibles.
 * @returns Promesse résolue avec un tableau des imprimantes.
 */
export const fetchImprimantes = async () => {
    try {
        const response = await axios.get<Imprimante[]>(`${apiBaseURL}/imprimante`);
        return response.data;
    } catch (error) {
        console.error('Error fetching imprimantes:', error);
        throw error;
    }
};

/**
 * Récupère les détails d'une imprimante spécifique par son ID.
 * @param id Identifiant de l'imprimante à récupérer.
 * @returns Promesse résolue avec les données de l'imprimante spécifiée.
 */
export const fetchImprimanteById = async (id: number) => {
    try {
        const response = await axios.get<Imprimante>(`${apiBaseURL}/imprimante/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching imprimante with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Ajoute une nouvelle imprimante à la base de données.
 * @param imprimanteData Données de la nouvelle imprimante (sans l'ID).
 * @returns Promesse résolue avec les données de l'imprimante ajoutée.
 */
export const createImprimante = async (imprimanteData: Omit<Imprimante, 'id'>) => {
    try {
        const response = await axios.post<Imprimante>(`${apiBaseURL}/imprimante`, imprimanteData);
        return response.data;
    } catch (error) {
        console.error('Error creating imprimante:', error);
        throw error;
    }
};

/**
 * Met à jour les données d'une imprimante existante.
 * @param id Identifiant de l'imprimante à mettre à jour.
 * @param imprimanteData Nouvelles données de l'imprimante (sans l'ID).
 * @returns Promesse résolue avec les données de l'imprimante mise à jour.
 */
export const updateImprimante = async (id: number, imprimanteData: Omit<Imprimante, 'id'>) => {
    try {
        const response = await axios.put<Imprimante>(`${apiBaseURL}/imprimante/${id}`, imprimanteData);
        return response.data;
    } catch (error) {
        console.error(`Error updating imprimante with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Supprime une imprimante spécifique de la base de données.
 * @param id Identifiant de l'imprimante à supprimer.
 * @returns Promesse résolue sans valeur de retour.
 */
export const deleteImprimante = async (id: number) => {
    try {
        await axios.delete(`${apiBaseURL}/imprimante/${id}`);
    } catch (error) {
        console.error(`Error deleting imprimante with ID ${id}:`, error);
        throw error;
    }
};

// Ce code fournit une interface claire pour la manipulation des données relatives aux imprimantes,
//  y compris la récupération de toutes les imprimantes, d'une imprimante spécifique par son ID,
//   la création d'une nouvelle imprimante, la mise à jour d'une imprimante existante, et la suppression d'une imprimante.
//    Chaque fonction utilise axios pour faire des appels API asynchrones, gérant les réponses et les erreurs de manière appropriée.


// Interface représentant la structure d'un objet Service.
export interface Service {
    id: number; // Identifiant unique du service.
    nom_service: string; // Nom du service.
}

// Fonction pour récupérer tous les services.
export const fetchServices = async () => {
    try {
        // Exécute une requête GET pour récupérer tous les services.
        const response = await axios.get(`${apiBaseURL}/service`);
        return response.data; // Retourne les données obtenues.
    } catch (error) {
        // Affiche une erreur dans la console si la requête échoue.
        console.error('Error fetching services:', error);
        throw error; // Propage l'erreur pour une gestion ultérieure.
    }
};

// Fonction pour créer un nouveau service.
export const createService = async (serviceData: Service) => {
    try {
        // Exécute une requête POST pour créer un nouveau service avec les données fournies.
        const response = await axios.post(`${apiBaseURL}/service`, serviceData);
        return response.data; // Retourne les données du service créé.
    } catch (error) {
        // Gère les erreurs potentielles et les affiche dans la console.
        console.error('Error creating service:', error);
        throw error;
    }
};

// Fonction pour récupérer un service par son identifiant.
export const fetchServiceById = async (id: number) => {
    try {
        // Exécute une requête GET pour récupérer un service spécifique par son ID.
        const response = await axios.get(`${apiBaseURL}/service/${id}`);
        return response.data; // Retourne les données du service spécifié.
    } catch (error) {
        // Gère les erreurs potentielles et les affiche dans la console.
        console.error('Error fetching service by id:', error);
        throw error;
    }
};

// Fonction pour mettre à jour un service.
export const updateService = async (id: number, serviceData: Service) => {
    try {
        // Exécute une requête PUT pour mettre à jour un service existant avec de nouvelles données.
        const response = await axios.put(`${apiBaseURL}/service/${id}`, serviceData);
        return response.data; // Retourne les données du service mis à jour.
    } catch (error) {
        // Gère les erreurs potentielles et les affiche dans la console.
        console.error('Error updating service:', error);
        throw error;
    }
};

// Fonction pour supprimer un service par son ID.
export const deleteService = async (id: number) => {
    try {
        // Exécute une requête DELETE pour supprimer un service spécifique par son ID.
        const response = await axios.delete(`${apiBaseURL}/service/${id}`);
        return response.data; // Retourne les données indiquant le succès de la suppression.
    } catch (error) {
        // Gère les erreurs potentielles et les affiche dans la console.
        console.error('Error deleting service:', error);
        throw error;
    }
};

// Chaque fonction utilise axios pour communiquer avec l'API et manipuler les données des services.
//  Les erreurs potentielles sont capturées et affichées dans la console, 
//  et les exceptions sont propagées pour permettre une gestion d'erreur plus spécifique par les consommateurs de ces fonctions.


// Définition du type pour le modèle d'utilisation des cartouches
export interface Utilisation {
    id?: number; // Identifiant unique de l'utilisation, optionnel pour les nouvelles créations
    id_service: number; // Identifiant du service utilisant la cartouche
    nom_service: string; // Nom du service
    id_cartouche: number; // Identifiant de la cartouche utilisée
    marque: string; // Marque de la cartouche
    rrf_cla: string; // Référence de la cartouche
    ref_const: string; // Référence constructeur de la cartouche
    couleur: string; // Couleur de l'encre de la cartouche
    date_remise?: string; // Date de remise de la cartouche, optionnel
    quantite_utilise: number; // Quantité utilisée de cette cartouche
}

// Récupération de toutes les données d'utilisation via API
export const fetchUtilisations = async () => {
    try {
        const response = await axios.get(`${apiBaseURL}/utilisation`);
        return response.data; // Retourne la liste des utilisations
    } catch (error) {
        console.error('Error fetching utilisations:', error);
    }
};

// Création d'une nouvelle utilisation dans la base de données via API
export const createUtilisation = async (utilisationData: Utilisation): Promise<Utilisation> => {
    try {
        const response = await axios.post(`${apiBaseURL}/utilisation`, utilisationData);
        return response.data; // Retourne l'objet Utilisation créé
    } catch (error) {
        console.error('Error creating utilisation:', error);
        throw error;
    }
};

// Récupération d'une utilisation spécifique par son identifiant via API
export const fetchUtilisationById = async (id: number) => {
    try {
        const response = await axios.get(`${apiBaseURL}/utilisation/${id}`);
        return response.data; // Retourne les données de l'utilisation demandée
    } catch (error) {
        console.error('Error fetching utilisation by ID:', error);
    }
};

// Mise à jour d'une utilisation spécifique via API
export const updateUtilisation = async (id: number, utilisationData: Utilisation) => {
    try {
        const response = await axios.post(`${apiBaseURL}/utilisation/${id}`, utilisationData);
        return response.data; // Retourne l'objet Utilisation mis à jour
    } catch (error) {
        console.error('Error updating utilisation:', error);
    }
};

// Suppression d'une utilisation via API
export const deleteUtilisation = async (id: number) => {
    try {
        await axios.delete(`${apiBaseURL}/utilisation/${id}`);
    } catch (error) {
        console.error('Error deleting utilisation:', error);
    }
};

// Chaque fonction API est asynchrone, utilisant await pour attendre la réponse d'Axios.
// Les données de réponse sont directement retournées pour être utilisées dans l'application.
// La gestion des erreurs est réalisée avec des blocs try-catch pour chaque fonction API,
//  en imprimant les erreurs sur la console et, dans certains cas, en relançant les erreurs pour une gestion plus haut niveau dans l'application.
//  Ces fonctions fournissent un moyen complet d'interagir avec les données d'utilisation des cartouches,
//   permettant de créer, lire, mettre à jour et supprimer des informations sur la façon dont les cartouches
//    sont utilisées par différents services au sein de l'organisation.