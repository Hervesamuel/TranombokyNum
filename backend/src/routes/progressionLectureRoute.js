// Importation d'Express
import express from "express";

// Importation du Controller
import {
    enregistrerProgression,
    getProgressionLivre,
    supprimerProgression
} from "../controllers/progressionLectureController.js";

// Importation des Middlewares
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Création du Router
const router = express.Router();

/*=========================================
        Enregistrer la progression
        (LECTEUR uniquement)
==========================================*/
router.post(
    "/",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    enregistrerProgression
);

/*=========================================
        Obtenir la progression
        (LECTEUR uniquement)
==========================================*/
router.get(
    "/:idlivre",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    getProgressionLivre
);

/*=========================================
        Supprimer la progression
        (LECTEUR uniquement)
==========================================*/
router.delete(
    "/:idlivre",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    supprimerProgression
);

export default router;