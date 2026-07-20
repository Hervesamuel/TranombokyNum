// Importation des fonctions du service
import {
    registerService,
    loginService
} from "../services/utilisateurService.js";

/*=========================================
    Inscription d'un nouvel utilisateur
==========================================*/
export const register = async (req, res) => {
    try {

        // Appel du service
        const resultat = await registerService(req.body);

        // Réponse de succès
        res.status(201).json(resultat);

    } catch (error) {

        // Réponse en cas d'erreur
        res.status(400).json({
            message: error.message
        });

    }
};

/*=========================================
    Connexion d'un utilisateur
==========================================*/
export const login = async (req, res) => {
    try {

        // Appel du service
        const resultat = await loginService(req.body);

        // Réponse de succès
        res.status(200).json(resultat);

    } catch (error) {

        // Réponse en cas d'erreur
        res.status(400).json({
            message: error.message
        });

    }
};
