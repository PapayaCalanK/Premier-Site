import React, { useState } from 'react';
import { createUtilisation, updateCartoucheQuantite } from '../api';

// Définition des types pour les propriétés de la cartouche et du service.
interface Cartouche {
    id?: number;
    rrf_cla: string; // Référence Isotech de la cartouche.
    couleur: string;
    date_achat: string | null;
    marque: string;
    date_peremption: string | null;
    ref_const: string; // Référence constructeur de la cartouche.
    quantites: number; // Quantité en stock.
}

interface Service {
    id: number;
    nom_service: string; // Nom du service.
}

// Props attendues par le composant CartoucheItem.
interface CartoucheItemProps {
    product: Cartouche;
    convertDate: (date: string | null) => string; // Fonction pour convertir les dates.
    isAuthenticated: boolean; // Indique si l'utilisateur est authentifié.
    handleEditProduct: (id: number, product: Cartouche) => void; // Fonction pour éditer la cartouche.
    handleDeleteProduct: (id: number) => void; // Fonction pour supprimer la cartouche.
    animatedProductId: number | null; // Id de la cartouche animée pour l'effet visuel.
    animationColor: string; // Couleur de l'animation.
    services: Service[]; // Liste des services disponibles.
    refreshCartouches: () => Promise<void>; // Fonction pour rafraîchir la liste des cartouches.
}

const CartoucheItem: React.FC<CartoucheItemProps> = ({
    product,
    convertDate,
    isAuthenticated,
    handleEditProduct,
    handleDeleteProduct,
    animatedProductId,
    animationColor,
    services,
    refreshCartouches,
}) => {
    // Gestion de l'affichage du menu déroulant pour sélectionner un service lors du retrait d'une cartouche.
    const [showServiceDropdown, setShowServiceDropdown] = useState<boolean>(false);
    const [selectedServiceId, setSelectedServiceId] = useState<number>(0); // Initialisation à 0 pour "Sélectionner le service".

    // Fonction appelée lorsque l'utilisateur souhaite ajouter ou retirer une cartouche.
    const onEditProduct = async (quantityChange: number) => {
        if (quantityChange < 0) {
            setShowServiceDropdown(true); // Affiche le menu déroulant pour sélectionner un service si l'utilisateur retire une cartouche.
        } else if (product.id) {
            await updateCartoucheQuantite(product.id, product.quantites + quantityChange); // Mise à jour de la quantité en stock.
            refreshCartouches(); // Rafraîchissement de la liste des cartouches.
        }
    };

    // Fonction appelée pour confirmer le retrait d'une cartouche après la sélection d'un service.
    const onRetireClick = async () => {
        if (product.id && selectedServiceId !== 0) {
            const service = services.find(s => s.id === selectedServiceId); // Trouve le service sélectionné.
            if (service) {
                await createUtilisation({
                    id_service: service.id,
                    id_cartouche: product.id,
                    quantite_utilise: 1,
                    nom_service: service.nom_service,
                    marque: product.marque,
                    rrf_cla: product.rrf_cla,
                    ref_const: product.ref_const,
                    couleur: product.couleur,
                    date_remise: new Date().toISOString(), // Date actuelle formatée en ISO.
                });
                await updateCartoucheQuantite(product.id, product.quantites - 1); // Décrémente la quantité en stock.
                refreshCartouches(); // Rafraîchissement de la liste des cartouches.
                setShowServiceDropdown(false); // Cache le menu déroulant après l'action.
            }
        }
    };

    // Rendu du composant, affichage des informations de la cartouche et des actions disponibles.
    return (
        <li className={`cartouche-case ${product.couleur ? product.couleur.toLowerCase() : 'default-color'} ${animatedProductId === product.id ? `neon-${animationColor}` : ''}`}>
            <div className="cartouche-content">
                <strong>Référence Isotech : </strong>{product.rrf_cla}<br />
                <strong>Référence Constructeur : </strong>{product.ref_const}<br />
                <strong>Couleur : </strong>{product.couleur}<br />
                <strong>Marque : </strong>{product.marque}<br />
                <strong>Quantité en stock : </strong>{product.quantites}<br />
                <strong>Date d'achat : </strong>{convertDate(product.date_achat)}<br />
                <strong>Date de péremption : </strong>{convertDate(product.date_peremption)}<br />
                {/* Optionnel: Si vous avez une image pour chaque cartouche, décommentez la ligne ci-dessous */}
                {/* {product.image && <img src={`/images/${product.image}`} alt={product.rrf_cla} style={{ maxWidth: '100px' }} />} */}
            </div>
            {isAuthenticated && (
                <div className="cartouche-actions">
                    {/* Boutons pour ajouter ou retirer une cartouche et pour supprimer la cartouche */}
                    <button onClick={() => onEditProduct(1)}>Ajouter 1 à la quantité</button>
                    <button onClick={() => onEditProduct(-1)}>Retirer 1 à la quantité</button>
                    {showServiceDropdown && (
                        <>
                            {/* Sélection du service pour le retrait d'une cartouche */}
                            <label htmlFor="serviceSelection">Sélectionner le service :</label>
                            <select id="serviceSelection" value={selectedServiceId} onChange={(e) => setSelectedServiceId(Number(e.target.value))}>
                                <option value="0">Sélectionner le service</option> {/* Option par défaut */}
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>{service.nom_service}</option>
                                ))}
                            </select>
                            <button onClick={onRetireClick}>Confirmer le retrait</button>
                        </>
                    )}
                    <button onClick={() => product.id && handleDeleteProduct(product.id)}>Supprimer</button>
                </div>
            )}
        </li>
    );
};

export default CartoucheItem;




// Ce code détaillé montre comment utiliser les hooks et le contexte d'authentification
//  pour conditionner l'affichage des fonctionnalités selon que l'utilisateur est authentifié ou non.
//   Il illustre également comment manipuler les données et interagir avec une API externe pour gérer l'inventaire des cartouches.






