// Importation du service Auteur
import * as auteurService from "../services/auteurService.js";

/*=========================================
        Ajouter un auteur
==========================================*/
export const ajouterAuteur = async (req, res) => {
    try {
        const auteur = await auteurService.ajouterAuteur(req.body);
        res.status(201).json(auteur);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/*=========================================
        Liste des auteurs
==========================================*/
export const getTousLesAuteurs = async (req, res) => {
    try {
        const auteurs = await auteurService.getTousLesAuteurs();
        res.status(200).json(auteurs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/*=========================================
        Rechercher un auteur par ID
==========================================*/
export const getAuteurParId = async (req, res) => {
    try {
        const auteur = await auteurService.getAuteurParId(
            Number(req.params.id)
        );
        res.status(200).json(auteur);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

/*=========================================
        Modifier un auteur
==========================================*/
export const modifierAuteur = async (req, res) => {
    try {
        const auteur = await auteurService.modifierAuteur(
            Number(req.params.id),
            req.body
        );
        res.status(200).json(auteur);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/*=========================================
        Supprimer un auteur
==========================================*/
export const supprimerAuteur = async (req, res) => {
    try {
        await auteurService.supprimerAuteur(
            Number(req.params.id)
        );
        res.status(200).json({
            message: "Auteur supprimé avec succès."
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};