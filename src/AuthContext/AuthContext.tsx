import React, { createContext, useState, ReactNode } from 'react';

// Définir le type pour le contexte d'authentification.
// Cela inclut une propriété booléenne pour vérifier si l'utilisateur est authentifié
// et une fonction pour modifier cette propriété.
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

// Créer le contexte d'authentification avec des valeurs par défaut.
// La propriété `isAuthenticated` est initialement fausse, signifiant que l'utilisateur n'est pas authentifié.
// `setIsAuthenticated` est une fonction vide par défaut qui sera remplacée par la fonction réelle dans le fournisseur.
export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => { }
});

// Définir les props attendues par le fournisseur, qui incluent les composants enfants.
interface AuthProviderProps {
    children: ReactNode;
}

// Le composant fournisseur pour le contexte d'authentification.
// Il utilise le hook `useState` pour gérer l'état d'authentification.
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Fonction pour définir l'état d'authentification.
    // Elle affiche un message dans la console chaque fois qu'elle est appelée pour faciliter le débogage.
    const handleSetIsAuthenticated = (value: boolean) => {
        console.log("handleSetIsAuthenticated called with value: ", value);
        setIsAuthenticated(value);
    };

    // Le fournisseur du contexte enveloppe les composants enfants et leur fournit l'accès
    // à `isAuthenticated` et `setIsAuthenticated` via le contexte.
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated: handleSetIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

// Ce composant encapsule d'autres composants (children) qui peuvent avoir besoin d'accéder à l'état d'authentification ou de le modifier.
//  En utilisant ce contexte, vous pouvez centraliser la gestion de l'authentification dans votre application,
//  permettant à n'importe quel composant enfant d'accéder facilement à l'état d'authentification et de le modifier via setIsAuthenticated,
//  sans avoir à propager les props manuellement à travers les niveaux de composants.