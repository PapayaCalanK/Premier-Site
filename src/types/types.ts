// Définition de l'interface `Cartouche` qui représente les données d'une cartouche d'encre.
export interface Cartouche {
    id?: number; // Un identifiant unique pour chaque cartouche. Le signe `?` indique que cet attribut est optionnel.
    rrf_cla: string; // Référence de la cartouche, un identifiant unique sous forme de chaîne.
    couleur: string; // La couleur de l'encre dans la cartouche.
    date_achat: string | null; // La date d'achat de la cartouche, peut être `null` si non spécifiée.
    marque: string; // La marque de la cartouche.
    date_peremption: string | null; // La date de péremption de la cartouche, peut être `null` si non spécifiée.
    ref_const: string; // Référence constructeur, un identifiant donné par le fabricant.
    quantites: number; // La quantité de cartouches disponibles.
}

// Définition de l'interface `CartoucheListProps` pour les props passés au composant qui liste les cartouches.
export interface CartoucheListProps {
    showLowStock: boolean; // Un booléen indiquant si le composant doit montrer les cartouches en faible stock.
    // D'autres props peuvent être ajoutés ici selon les besoins de votre composant.
}

// Définition de l'interface `CartoucheListState` pour l'état interne du composant qui liste les cartouches.
export interface CartoucheListState {
    products: Cartouche[]; // Un tableau des cartouches à afficher.
    newProduct: Cartouche; // Un objet `Cartouche` pour les données d'une nouvelle cartouche à potentiellement ajouter à la liste.
    filter: string; // Un filtre sous forme de chaîne de caractères pour affiner la liste des cartouches affichées.
    animatedProductId: number | null; // L'identifiant de la cartouche qui est actuellement animée, `null` si aucune animation n'est en cours.
    animationColor: 'green' | 'red' | ''; // La couleur de l'animation ('green' pour une ajout réussi, 'red' pour une erreur, '' si aucune animation).
    // D'autres états peuvent être ajoutés ici selon les besoins de votre composant.
}



// Ces interfaces permettent de typer de manière précise et explicite les données manipulées par votre application,
// contribuant à une meilleure maintenance du code et à une réduction des erreurs de type à l'exécution.
// L'utilisation de TypeScript pour définir des structures de données et des types de props et d'états
// assure également une meilleure autocomplétion et des vérifications de type au moment de la compilation.