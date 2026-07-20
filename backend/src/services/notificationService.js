import prisma from "../config/prisma.js";

/*=========================================
        Ajouter une notification
==========================================*/
export const ajouterNotification = async (data) => {
    // Vérifier que l'utilisateur existe
    const utilisateur = await prisma.utilisateur.findUnique({
        where: {
            iduser: data.iduser
        }
    });

    if (!utilisateur) {
        throw new Error("Utilisateur introuvable.");
    }
    // Si un livre est renseigné, vérifier qu'il existe
    if (data.idlivre) {
        const livre = await prisma.livre.findUnique({
            where: {
                idlivre: data.idlivre
            }
        });

        if (!livre) {
            throw new Error("Livre introuvable.");
        }
    }

    // Création de la notification
    return await prisma.notification.create({
        data: {
            titre: data.titre,
            message: data.message,
            type: data.type,
            iduser: data.iduser,
            idlivre: data.idlivre || null
        },
        include: {
            utilisateur: true,
            livre: true
        }
    });
};

/*=========================================
        Notifications d'un utilisateur
==========================================*/
export const getNotificationsUtilisateur = async (iduser) => {
    return await prisma.notification.findMany({
        where: {
            iduser
        },
        include: {
            livre: true
        },
        orderBy: {
            datecreation: "desc"
        }
    });
};

/*=========================================
        Marquer comme lue
==========================================*/
export const marquerCommeLue = async (idnotification) => {
    const notification = await prisma.notification.findUnique({
        where: {
            idnotification
        }
    });

    if (!notification) {
        throw new Error("Notification introuvable.");
    }

    return await prisma.notification.update({
        where: {
            idnotification
        },
        data: {
            estLu: true
        }
    });
};

/*=========================================
        Supprimer une notification
==========================================*/
export const supprimerNotification = async (idnotification) => {
    const notification = await prisma.notification.findUnique({
        where: {
            idnotification
        }
    });

    if (!notification) {
        throw new Error("Notification introuvable.");
    }

    await prisma.notification.delete({
        where: {
            idnotification
        }
    });
};