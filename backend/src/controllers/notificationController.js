import * as notificationService from "../services/notificationService.js";

/*=========================================
        Ajouter une notification
==========================================*/
export const ajouterNotification = async (req, res) => {
    try {
        const notification = await notificationService.ajouterNotification(
            req.body
        );
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/*=========================================
        Toutes les notifications d'un auteur
==========================================*/
export const getNotificationsAuteur = async (req, res) => {
    try {
        const notifications = await notificationService.getNotificationsAuteur(
            Number(req.params.idaut)
        );
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getNotificationsUtilisateur = async (req, res) => {

    try {

        const notifications =
            await notificationService.getNotificationsUtilisateur(
                Number(req.params.iduser)
            );

        res.status(200).json(notifications);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

/*=========================================
        Marquer une notification comme lue
==========================================*/
export const marquerCommeLue = async (req, res) => {
    try {
        const notification = await notificationService.marquerCommeLue(
            Number(req.params.idnotification)
        );
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/*=========================================
        Supprimer une notification
==========================================*/
export const supprimerNotification = async (req, res) => {
    try {
        await notificationService.supprimerNotification(
            Number(req.params.idnotification)
        );
        res.status(200).json({
            message: "Notification supprimée avec succès."
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};