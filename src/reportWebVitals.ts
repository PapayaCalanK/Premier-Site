// Importation de la classe ReportHandler de la bibliothèque web-vitals
import { ReportHandler } from 'web-vitals';

// Définition de la fonction reportWebVitals qui prend en paramètre une fonction onPerfEntry de type ReportHandler
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  // Vérification si onPerfEntry est défini et est une fonction
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Importation des fonctions de mesure des indicateurs de performance web depuis la bibliothèque web-vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Appel de chaque fonction de mesure avec la fonction onPerfEntry en tant qu'argument
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Exportation de la fonction reportWebVitals
export default reportWebVitals;

// Ce code définit une fonction reportWebVitals qui prend une fonction onPerfEntry en paramètre.
//  Si onPerfEntry est défini et est une fonction,
//   le code importe les fonctions de mesure des indicateurs de performance web (getCLS, getFID, getFCP, getLCP, getTTFB)
//    depuis la bibliothèque web-vitals et les appelle avec la fonction onPerfEntry.