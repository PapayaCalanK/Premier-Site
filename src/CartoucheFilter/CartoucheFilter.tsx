import React from 'react';

// Définir les types pour les props
// `setFilter` est une fonction appelée pour changer le filtre actuel.
// `isAuthenticated` est une propriété booléenne indiquant si l'utilisateur est authentifié.
interface CartoucheFilterProps {
    setFilter: (filter: string) => void;
    isAuthenticated: boolean;
}

const CartoucheFilter: React.FC<CartoucheFilterProps> = ({ setFilter, isAuthenticated }) => {
    // Si l'utilisateur n'est pas authentifié ou si la fonction setFilter n'est pas fournie,
    // ne rien afficher en retournant `null`.
    if (!isAuthenticated || !setFilter) {
        return null;
    }

    // Affichage des boutons de filtre. Chaque bouton, lorsqu'il est cliqué,
    // appelle `setFilter` avec la couleur correspondante comme argument.
    // Le bouton "Toutes les couleurs" permet de réinitialiser le filtre.
    return (
        <div>
            <button onClick={() => setFilter('Cyan')}>Cyan</button>
            <button onClick={() => setFilter('Magenta')}>Magenta</button>
            <button onClick={() => setFilter('Yellow')}>Yellow</button>
            <button onClick={() => setFilter('Black')}>Black</button>
            <button onClick={() => setFilter('Toutes')}>Toutes les couleurs</button>
        </div>
    );
};

export default CartoucheFilter;


// Ce composant sert à filtrer les cartouches affichées en fonction de leur couleur.
// Les boutons permettent à l'utilisateur de sélectionner un filtre spécifique (Cyan, Magenta, Yellow, Black) ou d'afficher toutes les couleurs.
//  La logique de filtrage elle-même (par exemple,
//      la modification de l'état ou des données affichées en fonction du filtre sélectionné) est gérée ailleurs dans l'application,
//       setFilter étant la fonction qui déclenche cette logique.






