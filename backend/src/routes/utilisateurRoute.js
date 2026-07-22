import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
// Importation du contrôleur
import {
    register,
    login
} from "../controllers/utilisateurController.js";
import { modifierProfil } from "../controllers/utilisateurController.js";
import { uploadPhoto } from "../middleware/uploadMiddleware.js";

// Création du routeur
const router = express.Router();

/* ===========================
   ROUTES UTILISATEUR
=========================== */

// Inscription d'un utilisateur (avec photo optionnelle)
router.post("/register", uploadPhoto.single("photo"), register);

// Connexion d'un utilisateur
router.post("/login", login);

// Route protégée : récupérer son profil
router.get("/profil", authMiddleware, (req, res) => {
  res.json({
    message: "Bienvenue sur votre profil.",
    utilisateur: req.user
  });
});

// Route protégée : modifier son profil (avec photo optionnelle)
router.put("/profil", authMiddleware, uploadPhoto.single("photo"), modifierProfil);

// Export du routeur
export default router;