// Importations nécessaires, incluant useState pour le state local, useContext pour accéder au contexte d'authentification,
// useEffect pour réagir aux changements d'état, et ReactNode pour typer le contenu enfant.
import React, { useState, ReactNode, useContext, useEffect } from 'react';

import { AuthContext } from '../AuthContext/AuthContext';
import './AdminAccess.css';

// Définition de l'interface des props attendues par le composant, ici uniquement des enfants React.
interface AdminAccessProps {
    children: ReactNode;
}

// Définition du composant fonctionnel AdminAccess avec destruction des props pour accéder directement aux enfants.
const AdminAccess: React.FC<AdminAccessProps> = ({ children }) => {
    // Utilisation du contexte d'authentification pour accéder à l'état d'authentification et aux fonctions de gestion.
    const authContext = useContext(AuthContext);

    // Déclaration de l'état local pour gérer l'affichage de la demande de mot de passe et le mot de passe saisi.
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [password, setPassword] = useState("");

    // Surveillance de l'état d'authentification pour cacher le prompt de mot de passe si l'utilisateur est authentifié.
    useEffect(() => {
        if (authContext?.isAuthenticated) {
            setShowPasswordPrompt(false);
        }
    }, [authContext?.isAuthenticated]);

    // Fonction appelée à la soumission du formulaire, vérifiant le mot de passe et mettant à jour l'état d'authentification.
    const checkPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prévenir le comportement par défaut de rechargement de page.
        if (password === "Alan94") { // Si le mot de passe est correct, authentifier l'utilisateur.
            authContext?.setIsAuthenticated(true);
        } else {
            alert("Mot de passe incorrect!"); // Sinon, alerter l'utilisateur.
        }
    };

    // Fonction pour afficher le formulaire de mot de passe.
    const handleAdminButtonClick = () => {
        setShowPasswordPrompt(true);
    };

    // Si l'utilisateur n'est pas authentifié et que le prompt de mot de passe est demandé, afficher le formulaire.
    if (!authContext?.isAuthenticated && showPasswordPrompt) {
        return (
            <div className="admin-access-form-container">
                <form onSubmit={checkPassword} className="admin-access-form">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez le mot de passe administrateur"
                    />
                    <button type="submit">Accéder à la page Administrateur</button>
                </form>
            </div>
        );
    }

    // Affichage conditionnel du bouton d'accès administrateur ou du contenu enfant, selon l'état d'authentification.
    return (
        <>
            {!authContext?.isAuthenticated && (
                <button onClick={handleAdminButtonClick} className="admin-button">
                    Administrateur
                </button>
            )}
            {children}
        </>
    );
};

// Export du composant pour utilisation dans d'autres parties de l'application.
export default AdminAccess;


// Ce composant encapsule le contenu enfant (children) et ne le rend accessible que si l'utilisateur est authentifié en tant qu'administrateur,
// offrant ainsi une couche de sécurité supplémentaire pour les sections sensibles de l'application.