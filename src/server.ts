import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3001; // Vous pouvez utiliser un port différent si nécessaire

app.use(cors()); // CORS

// Créer un sous-dossier "images" dans le dossier "public"
const uploadDir = path.join('../', 'public', 'images');
fs.mkdirSync(uploadDir, { recursive: true });

// Configurer multer pour gérer le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    // Générer un nom de fichier unique
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Définir la route pour le téléchargement du fichier
app.post('/api/upload', upload.single('file'), (req: express.Request, res: express.Response) => {
  // Renvoyer le nom du fichier téléchargé
  const fileName = (req.file as Express.Multer.File).filename;
  res.json({ fileName });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

// Cela transforme le script en module TypeScript
export { };
