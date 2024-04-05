// Importation des fonctions nécessaires depuis la bibliothèque Testing Library et le composant App à tester.
import { render, screen } from '@testing-library/react';
import App from './App';

// Définition d'un test unitaire nommé 'renders learn react link'.
test('renders learn react link', () => {
  // Utilisation de la fonction render pour rendre le composant App dans l'environnement virtuel de test.
  render(<App />);

  // Utilisation de screen.getByText pour chercher un élément qui contient le texte "learn react", insensible à la casse grâce à l'option /i.
  const linkElement = screen.getByText(/learn react/i);

  // Assertion pour vérifier que l'élément trouvé (linkElement) est bien présent dans le document.
  expect(linkElement).toBeInTheDocument();
});

// Ce test vérifie la présence d'un élément contenant le texte spécifié dans le rendu du composant App. 
// Si l'élément est trouvé, le test passe avec succès, sinon, le test échoue, 
// indiquant que le composant App ne se comporte pas comme attendu selon ce test.

// Pour que ce test soit pertinent, assurez-vous que le composant App contienne effectivement un lien
//  ou un élément avec le texte "learn react". Sinon, le test échouera, signalant l'absence de cet élément.
//   Ce genre de test est utile pour vérifier que des éléments clés ou des fonctionnalités 
//   attendues sont présents dans le rendu de vos composants React.