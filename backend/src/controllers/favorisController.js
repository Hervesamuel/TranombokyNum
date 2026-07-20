// Importation du service
import * as favorisService from "../services/favorisService.js";

/*=========================================
        Ajouter un favori
==========================================*/
export const ajouterFavori = async (req, res) => {
    try {
        const favori = await favorisService.ajouterFavori(
            req.user.iduser,
            req.body.idlivre
        );
        res.status(201).json(favori);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/*=========================================
        Liste des favoris
==========================================*/
export const getMesFavoris = async (req, res) => {
    try {
        const favoris = await favorisService.getMesFavoris(
            req.user.iduser
        );
        res.status(200).json(favoris);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/*=========================================
        Supprimer un favori
==========================================*/
export const supprimerFavori = async (req, res) => {
    try {
        await favorisService.supprimerFavori(
            req.user.iduser,
            Number(req.params.idlivre)
        );
        res.status(200).json({
            message: "Favori supprimé avec succès."
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};