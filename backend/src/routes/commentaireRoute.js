// Importation d'Express
import express from "express";

// Importation du Controller
import {
    ajouterCommentaire,
    getCommentairesLivre,
    modifierCommentaire,
    supprimerCommentaire
} from "../controllers/commentaireController.js";

// Importation des Middlewares
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Création du Router
const router = express.Router();

/*=========================================
        Ajouter un commentaire
        (LECTEUR uniquement)
==========================================*/
router.post(
    "/",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    ajouterCommentaire
);

/*=========================================
        Tous les commentaires d'un livre
==========================================*/
router.get(
    "/livre/:idlivre",
    getCommentairesLivre
);

/*=========================================
        Modifier un commentaire
        (LECTEUR uniquement)
==========================================*/
router.put(
    "/:idcom",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    modifierCommentaire
);

/*=========================================
        Supprimer un commentaire
        (LECTEUR uniquement)
==========================================*/
router.delete(
    "/:idcom",
    authMiddleware,
    roleMiddleware("LECTEUR"),
    supprimerCommentaire
);

export default router;