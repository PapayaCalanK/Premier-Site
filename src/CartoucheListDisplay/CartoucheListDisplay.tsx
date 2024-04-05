import React from 'react';
import CartoucheItem from '../CartoucheItem/CartoucheItem'; // Importe le composant CartoucheItem
import { Cartouche } from '../types/types'; // Importe le type Cartouche
import { Service } from '../api'; // Importe le type Service depuis l'API

// Définition des props attendus par le composant CartoucheListDisplay
interface CartoucheListDisplayProps {
    services: Service[]; // Liste des services disponibles
    displayedProducts: Cartouche[]; // Liste des produits (cartouches) à afficher
    convertDate: (date: string | null) => string; // Fonction pour convertir les dates
    isAuthenticated: boolean; // Indique si l'utilisateur est authentifié
    handleEditProduct: (productId: number, updatedProductData: Cartouche) => Promise<void>; // Fonction pour gérer la modification d'un produit
    handleDeleteProduct: (productId: number) => Promise<void>; // Fonction pour gérer la suppression d'un produit
    animatedProductId: number | null; // ID du produit animé, le cas échéant
    animationColor: string; // Couleur de l'animation
    refreshCartouches: () => Promise<void>; // Fonction pour rafraîchir la liste des cartouches
}

// Définition du composant fonctionnel CartoucheListDisplay
const CartoucheListDisplay: React.FC<CartoucheListDisplayProps> = ({
    services,
    displayedProducts,
    convertDate,
    isAuthenticated,
    handleEditProduct,
    handleDeleteProduct,
    animatedProductId,
    animationColor,
    refreshCartouches,
}) => {
    // Filtrage des services pour ne garder que ceux ayant un ID défini
    const servicesWithId = services.filter(service => service.id !== undefined);

    return (
        <ul className="page-list">
            {displayedProducts.map((product, index) => ( // Parcours des produits à afficher
                <CartoucheItem // Rendu de chaque cartouche en tant que CartoucheItem
                    key={product.id} // Clé unique pour chaque élément de la liste
                    product={product} // Données du produit à passer au CartoucheItem
                    convertDate={convertDate} // Fonction de conversion de date
                    isAuthenticated={isAuthenticated} // Statut d'authentification
                    handleEditProduct={handleEditProduct} // Fonction de gestion de l'édition
                    handleDeleteProduct={handleDeleteProduct} // Fonction de gestion de la suppression
                    animatedProductId={animatedProductId} // ID du produit animé
                    animationColor={animationColor} // Couleur de l'animation
                    services={servicesWithId} // Services filtrés à passer
                    refreshCartouches={refreshCartouches} // Fonction de rafraîchissement des cartouches
                />
            ))}
        </ul>
    );
};

export default CartoucheListDisplay; // Export du composant


// Ce code définit un composant CartoucheListDisplay qui reçoit des informations sur les cartouches à afficher ainsi que sur les services disponibles.
//  Il utilise ces informations pour afficher une liste de composants CartoucheItem, chacun représentant une cartouche.
//  Les props fournies permettent de gérer les interactions telles que l'édition, la suppression et le rafraîchissement des données.