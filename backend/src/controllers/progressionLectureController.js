// Importation du Service
import * as progressionLectureService from "../services/progressionLectureService.js";

/*=========================================
        Enregistrer la progression
==========================================*/
export const enregistrerProgression = async (req, res) => {
    try {
        const progression = await progressionLectureService.enregistrerProgression(
            req.user.iduser,
            req.body
        );
        res.status(200).json(progression);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/*=========================================
        Obtenir la progression d'un livre
==========================================*/
export const getProgressionLivre = async (req, res) => {
    try {
        const progression = await progressionLectureService.getProgressionLivre(
            req.user.iduser,
            Number(req.params.idlivre)
        );
        res.status(200).json(progression);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

/*=========================================
        Supprimer la progression
==========================================*/
export const supprimerProgression = async (req, res) => {
    try {
        await progressionLectureService.supprimerProgression(
            req.user.iduser,
            Number(req.params.idlivre)
        );
        res.status(200).json({
            message: "Progression supprimée avec succès."
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};