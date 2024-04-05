// Importe React et plusieurs composants spécifiques de la bibliothèque `recharts` pour construire un graphique en barres.
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Définit une interface TypeScript pour les éléments de données que le graphique utilisera.
// Chaque élément doit avoir un `name` de type `string` et une `consommation` de type `number`.
interface GraphDataItem {
    name: string;
    consommation: number;
}

// Définit une interface pour les props du composant `Graphique`.
// `data` est un tableau d'objets `GraphDataItem`, et `width` et `height` sont des nombres optionnels avec des valeurs par défaut.
interface GraphiqueProps {
    data: GraphDataItem[];
    width?: number;
    height?: number;
}

// Déclare le composant `Graphique` en utilisant une fonction fléchée.
// Les props sont destructurés pour extraire `data`, et des valeurs par défaut sont fournies pour `width` et `height`.
const Graphique: React.FC<GraphiqueProps> = ({ data, width = 600, height = 300 }) => (
    // Utilise le composant `BarChart` de `recharts` pour créer le graphique en barres.
    // `width`, `height`, et `data` sont passés en props au `BarChart`.
    <BarChart width={width} height={height} data={data}>
        {/* // `CartesianGrid` ajoute une grille au graphique avec un style de ligne pointillée. */}
        <CartesianGrid strokeDasharray="3 3" />
        {/* // `XAxis` et `YAxis` définissent les axes du graphique. `dataKey="name"` indique que la propriété `name` des données sera utilisée pour les étiquettes de l'axe X. */}
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />

        {/* // `Tooltip` affiche une info-bulle qui donne plus d'informations sur le point survolé. */}
        <Tooltip />
        {/* // `Legend` affiche une légende pour le graphique. */}
        <Legend />
        {/* // `Bar` représente les barres du graphique. `dataKey="consommation"` indique que la propriété `consommation` des données sera utilisée pour la hauteur des barres. `fill` définit la couleur des barres. */}
        <Bar dataKey="consommation" fill="#8884d8" />
    </BarChart>
);

// Exporte le composant `Graphique` pour qu'il puisse être utilisé ailleurs dans l'application.
export default Graphique;
