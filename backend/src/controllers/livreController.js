// Importation du service Livre
import * as livreService from "../services/livreService.js";

/*=========================================
        Ajouter un livre
==========================================*/
export const ajouterLivre = async (req, res) => {
    try {
        const data = { ...req.body, couverture: req.files?.couverture?.[0]?.filename || null, fichierPdf: req.files?.fichierPdf?.[0]?.filename || null };
        const livre = await livreService.ajouterLivre(data);
        res.status(201).json(livre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
/*=========================================
        Obtenir tous les livres
==========================================*/
export const getTousLesLivres = async (req, res) => {
    try {
        const livres = await livreService.getTousLesLivres();
        res.status(200).json(livres);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/*=========================================
        Obtenir un livre par ID
==========================================*/
export const getLivreParId = async (req, res) => {
    try {
        const livre = await livreService.getLivreParId(
            Number(req.params.id)
        );
        res.status(200).json(livre);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

/*=========================================
        Modifier un livre
==========================================*/
export const modifierLivre = async (req, res) => {
    try {
        const data = { ...req.body, couverture: req.files?.couverture?.[0]?.filename, fichierPdf: req.files?.fichierPdf?.[0]?.filename };
        const livre = await livreService.modifierLivre(Number(req.params.id), data);
        res.status(200).json(livre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
/*=========================================
        Supprimer un livre
==========================================*/
export const supprimerLivre = async (req, res) => {
    try {
        await livreService.supprimerLivre(
            Number(req.params.id)
        );
        res.status(200).json({
            message: "Livre supprimé avec succès."
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

/*=========================================
        Valider un livre
==========================================*/
export const validerLivre = async (req, res) => {
    try {
        const livre = await livreService.validerLivre(
            Number(req.params.id)
        );
        res.status(200).json(livre);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/*=========================================
        Refuser un livre
==========================================*/
export const refuserLivre = async (req, res) => {
    try {
        const livre = await livreService.refuserLivre(
            Number(req.params.id)
        );
        res.status(200).json(livre);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};