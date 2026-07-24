import * as commentaireService from "../services/commentaireService.js";
/*=========================================
        Ajouter un commentaire
==========================================*/
export const ajouterCommentaire = async (req, res) => {
    try {
        const commentaire = await commentaireService.ajouterCommentaire(
            req.user.iduser,
            req.body
        );
        res.status(201).json(commentaire);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/*=========================================
        Tous les commentaires d'un livre
==========================================*/
export const getCommentairesLivre = async (req, res) => {
    try {
        const commentaires = await commentaireService.getCommentairesLivre(
            Number(req.params.idlivre)
        );
        res.status(200).json(commentaires);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/*=========================================
        Modifier un commentaire
==========================================*/
export const modifierCommentaire = async (req, res) => {
    try {
        const commentaire = await commentaireService.modifierCommentaire(
            req.user.iduser,
            Number(req.params.idcom),
            req.body
        );
        res.status(200).json(commentaire);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/*=========================================
        Supprimer un commentaire
==========================================*/
export const supprimerCommentaire = async (req, res) => {
    try {
        await commentaireService.supprimerCommentaire(
            req.user.iduser,
            Number(req.params.idcom)
        );
        res.status(200).json({
            message: "Commentaire supprimé avec succès."
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};