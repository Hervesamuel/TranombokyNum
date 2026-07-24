import multer from "multer";
import fs from "fs";
import path from "path";

const couvertureDir = "uploads/couvertures";
const pdfDir = "uploads/pdf";

[couvertureDir, pdfDir].forEach((dir) => {
    if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); console.log(`📁 Dossier créé : ${dir}`); }
});

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (file.fieldname === "couverture") cb(null, couvertureDir);
        else if (file.fieldname === "fichierPdf") cb(null, pdfDir);
        else cb(new Error("Champ de fichier inconnu"));
    },
    filename(req, file, cb) {
        cb(null, Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "couverture") {
        return file.mimetype.startsWith("image/") ? cb(null, true) : cb(new Error("La couverture doit être une image."));
    }
    if (file.fieldname === "fichierPdf") {
        return file.mimetype === "application/pdf" ? cb(null, true) : cb(new Error("Le livre doit être au format PDF."));
    }
    cb(new Error("Champ non autorisé."));
};

const uploadLivre = multer({ storage, fileFilter, limits: { fileSize: 20 * 1024 * 1024 } });

export default uploadLivre;