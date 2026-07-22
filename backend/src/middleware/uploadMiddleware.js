import multer from "multer";
import path from "path";
import fs from "fs";

// Chemin du dossier de destination
const dossierDestination = "public/uploads/photos";

// Créer le dossier automatiquement s'il n'existe pas
if (!fs.existsSync(dossierDestination)) {
  fs.mkdirSync(dossierDestination, { recursive: true });
}

// Stockage sur disque, dans public/uploads/photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dossierDestination);
  },
  filename: (req, file, cb) => {
    // Nom unique : timestamp + extension d'origine
    const extension = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});

// Filtre : uniquement png et jpg/jpeg
const filtreFichier = (req, file, cb) => {
  const typesAutorises = ["image/png", "image/jpeg"];
  if (typesAutorises.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers PNG et JPG sont autorisés."), false);
  }
};

export const uploadPhoto = multer({
  storage,
  fileFilter: filtreFichier,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo max
});