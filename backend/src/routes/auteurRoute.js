// Importation d'Express
import express from "express";

// Importation du Controller Auteur
import {
    ajouterAuteur,
    getTousLesAuteurs,
    getAuteurParId,
    modifierAuteur,
    supprimerAuteur
} from "../controllers/auteurController.js";

// Importation des Middlewares
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Création du Router
const router = express.Router();

/*=========================================
        Ajouter un auteur
        (ADMIN uniquement)
==========================================*/
router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    ajouterAuteur
);

/*=========================================
        Liste des auteurs
        (Accessible à tous)
==========================================*/
router.get(
    "/",
    getTousLesAuteurs
);

/*=========================================
        Rechercher un auteur par ID
        (Accessible à tous)
==========================================*/
router.get(
    "/:id",
    getAuteurParId
);

/*=========================================
        Modifier un auteur
        (ADMIN uniquement)
==========================================*/
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    modifierAuteur
);

/*=========================================
        Supprimer un auteur
        (ADMIN uniquement)
==========================================*/
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    supprimerAuteur
);

// Exportation du Router
export default router;