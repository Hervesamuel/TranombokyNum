// Importation d'Express
import express from "express";

// Importation du Controller
import {
    ajouterFavori,
    getMesFavoris,
    supprimerFavori
} from "../controllers/favorisController.js";

// Importation des Middlewares
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Création du Router
const router = express.Router();

/*=========================================
        Ajouter un favori
        (LECTEUR uniquement)
==========================================*/
router.post(
    "/",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    ajouterFavori
);

/*=========================================
        Mes favoris
        (LECTEUR uniquement)
==========================================*/
router.get(
    "/",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    getMesFavoris
);

/*=========================================
        Supprimer un favori
        (LECTEUR uniquement)
==========================================*/
router.delete(
    "/:idlivre",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    supprimerFavori
);

export default router;