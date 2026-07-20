// Importation du Service
import * as historiqueService from "../services/historiqueService.js";

/*=========================================
        Ajouter dans l'historique
==========================================*/
export const ajouterHistorique = async (req, res) => {
    try {
        const historique = await historiqueService.ajouterHistorique(
            req.user.iduser,
            req.body
        );
        res.status(201).json(historique);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/*=========================================
        Mon historique
==========================================*/
export const getMonHistorique = async (req, res) => {
    try {
        const historique = await historiqueService.getMonHistorique(
            req.user.iduser
        );
        res.status(200).json(historique);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/*=========================================
        Supprimer un historique
==========================================*/
export const supprimerHistorique = async (req, res) => {
    try {
        await historiqueService.supprimerHistorique(
            Number(req.params.idhistorique)
        );
        res.status(200).json({
            message: "Historique supprimé avec succès."
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};