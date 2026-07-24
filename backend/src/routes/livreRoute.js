// Importation d'Express
import express from "express";

// Importation du Controller
import {
    ajouterLivre,
    getTousLesLivres,
    getLivreParId,
    modifierLivre,
    supprimerLivre,
    validerLivre,
    refuserLivre
} from "../controllers/livreController.js";

// Importation des Middlewares
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import uploadLivre from "../middleware/uploadLivre.js";

// Création du Router
const router = express.Router();

/*=========================================
        Ajouter un livre
        (AUTEUR ou ADMIN)
==========================================*/
router.post("/", authMiddleware, roleMiddleware("AUTEUR", "ADMIN"), uploadLivre.fields([{ name: "couverture", maxCount: 1 }, { name: "fichierPdf", maxCount: 1 }]), ajouterLivre);
/*=========================================
        Liste des livres
==========================================*/
router.get(
    "/",
    getTousLesLivres
);

/*=========================================
        Livre par ID
==========================================*/
router.get(
    "/:id",
    getLivreParId
);

/*=========================================
        Modifier un livre
        (AUTEUR ou ADMIN)
==========================================*/
router.put("/:id", authMiddleware, roleMiddleware("AUTEUR", "ADMIN"), uploadLivre.fields([{ name: "couverture", maxCount: 1 }, { name: "fichierPdf", maxCount: 1 }]), modifierLivre);

/*=========================================
        Supprimer un livre
        (ADMIN uniquement)
==========================================*/
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    supprimerLivre
);

/*=========================================
        Valider un livre
        (ADMIN uniquement)
==========================================*/
router.put(
    "/:id/valider",
    authMiddleware,
    roleMiddleware("ADMIN"),
    validerLivre
);

/*=========================================
        Refuser un livre
        (ADMIN uniquement)
==========================================*/
router.put(
    "/:id/refuser",
    authMiddleware,
    roleMiddleware("ADMIN"),
    refuserLivre
);

export default router;