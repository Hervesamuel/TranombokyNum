import express from "express";

// Importation du Controller
import {
    ajouterNotification,
    getNotificationsUtilisateur,
    marquerCommeLue,
    supprimerNotification
} from "../controllers/notificationController.js";

// Importation des Middlewares
import authMiddleware from "../middleware/authMiddleware.js";

// Création du Router
const router = express.Router();

/*=========================================
        Ajouter une notification
==========================================*/
router.post(
    "/",
    authMiddleware,
    ajouterNotification
);

/*=========================================
        Mes notifications
==========================================*/
router.get(
    "/:iduser",
    authMiddleware,
    getNotificationsUtilisateur
);

/*=========================================
        Marquer comme lue
==========================================*/
router.put(
    "/:idnotification/lue",
    authMiddleware,
    marquerCommeLue
);

/*=========================================
        Supprimer
==========================================*/
router.delete(
    "/:idnotification",
    authMiddleware,
    supprimerNotification
);

export default router;