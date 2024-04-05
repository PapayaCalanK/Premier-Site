import React, { Component, ContextType } from 'react';
import { fetchCartouches, createCartouche, updateCartoucheQuantite, deleteCartouche, fetchServices } from '../api'; // Import des fonctions de l'API pour interagir avec les données des cartouches et des services.
import AddCartoucheForm from '../AddCartoucheForm/AddCartoucheForm'; // Composant pour le formulaire d'ajout de cartouche.
import CartoucheFilter from '../CartoucheFilter/CartoucheFilter'; // Composant pour filtrer les cartouches affichées.
import CartoucheListDisplay from '../CartoucheListDisplay/CartoucheListDisplay'; // Composant pour afficher la liste des cartouches.
import { AuthContext } from '../AuthContext/AuthContext'; // Contexte d'authentification pour gérer les droits d'accès.
import './CartoucheList.css'; // Feuille de style du composant.
import { Cartouche, CartoucheListProps } from '../types/types'; // Types TypeScript pour les props et états.

interface ServiceType {
  id: number;
  nom_service: string; // Nom du service.
}

interface CartoucheListState {
  products: Cartouche[];
  newProduct: Cartouche; // Cartouche à ajouter.
  filter: string; // Filtre appliqué aux cartouches affichées.
  animatedProductId: number | null; // ID du produit pour l'animation.
  animationColor: string; // Couleur de l'animation.
  services: ServiceType[]; // Liste des services disponibles pour l'attribution aux cartouches.
  cartouches: Cartouche[]; // Liste des cartouches (semblable à 'products' ?).
}

class CartoucheList extends Component<CartoucheListProps, CartoucheListState> {
  static contextType = AuthContext; // Utilisation du contexte d'authentification.
  context!: ContextType<typeof AuthContext>; // Assurance du typage correct pour le contexte.


  constructor(props: CartoucheListProps) {
    super(props);
    this.state = {  // /* Initialisation de l'état du composant avec des valeurs par défaut */ };
      products: [],
      newProduct: {
        rrf_cla: '',
        couleur: '',
        date_achat: null,
        marque: '',
        date_peremption: null,
        ref_const: '',
        quantites: 0,
      },
      filter: 'Toutes',
      animatedProductId: null,
      animationColor: '',
      services: [],
      cartouches: [],
    };
  }

  async componentDidMount() {
    this.fetchProducts(); // Récupération des cartouches à l'initialisation du composant.
    this.fetchServices(); // Récupération des services disponibles.
  }

  fetchServices = async () => {
    const services = await fetchServices();
    this.setState({ services });
  }


  fetchProducts = async () => {
    try {
      const data = await fetchCartouches(); // Appel API pour récupérer les cartouches.
      this.setState({ products: data }); // Mise à jour de l'état avec les cartouches récupérées.
    } catch (error) {
      console.error('Error while fetching products:', error); // Gestion des erreurs.
    }
  };



  handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target; // Récupération du nom de l'input et de sa nouvelle valeur.
    this.setState((prevState) => ({
      newProduct: {
        ...prevState.newProduct,
        [name]: value, // Mise à jour dynamique de la propriété de 'newProduct' basée sur l'input modifié.
      },
    }));
  };

  handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêchement du comportement par défaut de soumission de formulaire.
    const newProductData = this.prepareProductData(this.state.newProduct); // Préparation des données de la nouvelle cartouche.
    const data = await createCartouche(newProductData); // Création de la nouvelle cartouche via l'API.
    if (data) {
      this.setState({
        newProduct: {
          rrf_cla: '',
          couleur: '',
          date_achat: null,
          marque: '',
          date_peremption: null,
          ref_const: '',
          quantites: 0,
        }
      });
    }
  };

  // La méthode handleEditProduct permet de mettre à jour la quantité d'une cartouche.
  // Elle prend en paramètre l'ID de la cartouche à mettre à jour et les nouvelles données de la cartouche.
  handleEditProduct = async (productId: number, updatedProductData: Cartouche) => {
    // Met à jour la quantité de la cartouche spécifiée via l'API et rafraîchit la liste des cartouches.
    const data = await updateCartoucheQuantite(productId, updatedProductData.quantites);
    if (data) {
      this.fetchProducts(); // Recharge les données des cartouches après la mise à jour.
    }
  };


  // La méthode handleDeleteProduct gère la suppression d'une cartouche.
  handleDeleteProduct = async (productId: number) => {
    // Demande une confirmation avant de procéder à la suppression.
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette cartouche ?");
    if (isConfirmed) {
      // Si confirmé, supprime la cartouche via l'API et rafraîchit la liste.
      try {
        await deleteCartouche(productId);
        this.fetchProducts(); // Recharge les cartouches après la suppression.
      } catch (error) {
        console.error('Error deleting cartouche:', error); // Gère les erreurs de suppression.
      }
    }
  };


  // La méthode prepareProductData prépare les données d'une cartouche pour l'envoi à l'API.
  prepareProductData = (productData: Cartouche) => {
    // Convertit les dates de format local vers le format ISO pour l'API.
    const convertDate = (dateStr: string | null) => {
      if (!dateStr) return null; // Si la date est nulle, retourne null.
      const date = new Date(dateStr);
      return date.toISOString(); // Convertit la date au format ISO.
    };


    return {
      ...productData,
      date_achat: convertDate(productData.date_achat), // Convertit la date d'achat.
      date_peremption: convertDate(productData.date_peremption), // Convertit la date de péremption.
    };
  };

  // La méthode setFilter permet de modifier le filtre appliqué à la liste des cartouches.
  setFilter = (filter: string) => {
    this.setState({ filter }); // Met à jour l'état avec le nouveau filtre.
  };

  // La méthode convertDate convertit une date ISO en chaîne de caractères au format local.
  convertDate = (isoDateStr: string | null) => {
    if (!isoDateStr) return ''; // Si la date ISO est nulle, retourne une chaîne vide.
    const date = new Date(isoDateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Retourne la date formatée.
  };

  // La méthode refreshCartouches rafraîchit la liste des cartouches en les rechargeant depuis l'API.
  refreshCartouches = async () => {
    const updatedCartouches = await fetchCartouches(); // Charge les données actualisées des cartouches.
    this.setState({ cartouches: updatedCartouches }); // Met à jour l'état avec les nouvelles données.
  };

  // La méthode render définit l'affichage du composant.
  render() {
    const { products, newProduct, filter, animatedProductId, animationColor } = this.state;
    const isAuthenticated = this.context?.isAuthenticated ?? false; // Utilise le contexte d'authentification pour vérifier si l'utilisateur est authentifié.

    // Filtre les cartouches à afficher selon le filtre choisi ou montre les cartouches en rupture de stock si demandé.
    let displayedProducts = products.filter(p =>
      this.props.showLowStock ? p.quantites < 2 : filter === 'Toutes' || p.couleur === filter
    );

    // Structure du rendu du composant, incluant le formulaire d'ajout de cartouche, le filtre, et la liste des cartouches.
    return (
      <div className="cartouche-list-container">
        <h1>Stocks des cartouches d'encres</h1>
        <CartoucheFilter setFilter={this.setFilter} isAuthenticated={isAuthenticated} />
        {isAuthenticated && (
          <AddCartoucheForm
            handleAddProduct={this.handleAddProduct}
            newProduct={newProduct}
            handleInputChange={this.handleInputChange}
            isAuthenticated={isAuthenticated}
          />
        )}
        <CartoucheListDisplay
          displayedProducts={displayedProducts}
          handleEditProduct={this.handleEditProduct}
          handleDeleteProduct={this.handleDeleteProduct}
          animatedProductId={animatedProductId}
          animationColor={animationColor}
          convertDate={this.convertDate}
          isAuthenticated={isAuthenticated}
          services={this.state.services} // Passe la liste des services en props.
          refreshCartouches={this.refreshCartouches} // Passe la fonction de rafraîchissement en props.
        />
      </div>
    );
  }
}

export default CartoucheList;


// Ce code montre comment structurer un composant de liste de cartouches avec des fonctionnalités complètes de création,
//  d'édition, de suppression, de filtrage, et de mise à jour.
//   Il utilise l'état et les props pour passer des données et des fonctions aux sous-composants,
//   et intègre le contexte d'authentification pour contrôler l'accès aux fonctionnalités d'administration.