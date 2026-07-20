// Importation d'Express
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
// Importation du contrôleur
import {
    register,
    login
} from "../controllers/utilisateurController.js";

// Création du routeur
const router = express.Router();

/* ===========================
   ROUTES UTILISATEUR
=========================== */

// Inscription d'un utilisateur
router.post("/register", register);
router.get("/register", register);

// Connexion d'un utilisateur
router.post("/login", login);



// Route protégée
router.get("/profil", authMiddleware, (req, res) => {

    res.json({
        message: "Bienvenue sur votre profil.",
        utilisateur: req.user
    });

});

// Export du routeur
export default router;