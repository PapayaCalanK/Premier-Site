// Importation des hooks et types nécessaires depuis React
import React, { ChangeEvent, FormEvent } from 'react';

// Définition de l'interface pour une cartouche, décrivant la structure des données d'une cartouche.
interface Cartouche {
    id?: number; // Optionnel, utilisé pour identifier une cartouche spécifique
    rrf_cla: string; // Référence Isotech de la cartouche
    couleur: string; // Couleur de la cartouche
    date_achat: string | null; // Date d'achat de la cartouche, peut être null si non spécifiée
    marque: string; // Marque de la cartouche
    date_peremption: string | null; // Date de péremption de la cartouche, peut être null si non spécifiée
    ref_const: string; // Référence constructeur de la cartouche
    quantites: number; // Quantité de cartouches en stock
}

// Définition de l'interface pour les props du composant AddCartoucheForm, 
// incluant des fonctions pour gérer l'ajout d'une cartouche et le changement des inputs, 
// ainsi que les données de la nouvelle cartouche à ajouter.
interface AddCartoucheFormProps {
    handleAddProduct: (e: FormEvent<HTMLFormElement>) => void; // Fonction appelée lors de la soumission du formulaire
    newProduct: Cartouche; // Les données de la nouvelle cartouche à ajouter
    handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Fonction pour gérer le changement des inputs du formulaire
    isAuthenticated: boolean; // Indique si l'utilisateur est authentifié ou non
}

// Composant fonctionnel AddCartoucheForm pour ajouter une nouvelle cartouche.
const AddCartoucheForm: React.FC<AddCartoucheFormProps> = ({ handleAddProduct, newProduct, handleInputChange, isAuthenticated }) => {
    // Affichage de logs pour débugger ou vérifier la prop isAuthenticated
    console.log("AddCartoucheForm: isAuthenticated", isAuthenticated);
    return (
        // Formulaire pour ajouter une nouvelle cartouche
        <form onSubmit={handleAddProduct} className="add-cartouche-form">
            <div className="form-row">
                {/* // Groupe d'inputs pour les informations de base de la cartouche (référence Isotech, constructeur, couleur, marque) */}
                <div className="form-group">
                    <label htmlFor="rrf_cla">Référence Isotech :</label>
                    <input type="text" name="rrf_cla" id="rrf_cla" value={newProduct.rrf_cla} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="ref_const">Référence Constructeur :</label>
                    <input type="text" name="ref_const" id="ref_const" value={newProduct.ref_const} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="couleur">Couleur :</label>
                    <select name="couleur" id="couleur" value={newProduct.couleur} onChange={handleInputChange}>
                        <option value="" disabled>Sélectionner la couleur</option>
                        <option value="Cyan">Cyan</option>
                        <option value="Magenta">Magenta</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Black">Black</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="marque">Marque :</label>
                    <select name="marque" id="marque" value={newProduct.marque} onChange={handleInputChange}>
                        <option value="" disabled>Sélectionner la marque</option>
                        <option value="Isotech">Isotech</option>
                        <option value="Hp">Hp</option>
                        <option value="Owa">Owa</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="quantites">Quantité en stock :</label>
                    <input type="number" name="quantites" id="quantites" value={newProduct.quantites} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="date_achat">Date d'achat :</label>
                    <input type="date" name="date_achat" id="date_achat" value={newProduct.date_achat || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="date_peremption">Date de péremption :</label>
                    <input type="date" name="date_peremption" id="date_peremption" value={newProduct.date_peremption || ''} onChange={handleInputChange} />
                </div>
                {/* // Bouton pour soumettre le formulaire et ajouter la cartouche */}
                <div className="form-group">
                    <button type="submit" className="add-cartouche-button">Ajouter une Cartouche</button>
                </div>
            </div>
        </form>
    );
};

// Export du composant pour utilisation dans d'autres parties de l'application
export default AddCartoucheForm;


// Ce code illustre comment créer un formulaire React pour ajouter de nouvelles cartouches à l'inventaire,
// en utilisant des interfaces pour définir la structure des données et des props,
//  et en gérant les interactions de l'utilisateur avec des fonctions.