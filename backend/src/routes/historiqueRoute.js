import express from "express";
// Importation du Controller
import {
    ajouterHistorique,
    getMonHistorique,
    supprimerHistorique
} from "../controllers/historiqueController.js";

// Importation des Middlewares
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Création du Router
const router = express.Router();

/*=========================================
        Ajouter dans l'historique
        (LECTEUR uniquement)
==========================================*/
router.post(
    "/",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    ajouterHistorique
);

/*=========================================
        Voir mon historique
        (LECTEUR uniquement)
==========================================*/
router.get(
    "/",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    getMonHistorique
);

/*=========================================
        Supprimer un historique
        (LECTEUR uniquement)
==========================================*/
router.delete(
    "/:idhistorique",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    supprimerHistorique
);

export default router;