import prisma from "../config/prisma.js";

/*=========================================
        Ajouter dans l'historique
==========================================*/
export const ajouterHistorique = async (iduser, data) => {
    // Vérifier si le livre existe
    const livre = await prisma.livre.findUnique({
        where: {
            idlivre: data.idlivre
        }
    });

    if (!livre) {
        throw new Error("Livre introuvable.");
    }

    // Ajouter dans l'historique
    return await prisma.historique.create({
        data: {
            iduser: iduser,
            idlivre: data.idlivre
        },
        include: {
            livre: true
        }
    });
};

/*=========================================
        Mon historique
==========================================*/
export const getMonHistorique = async (iduser) => {
    return await prisma.historique.findMany({
        where: {
            iduser: iduser
        },
        include: {
            livre: {
                include: {
                    auteur: true
                }
            }
        },
        orderBy: {
            datelecture: "desc"
        }
    });
};

/*=========================================
        Supprimer un historique
==========================================*/
export const supprimerHistorique = async (idhistorique) => {
    const historique = await prisma.historique.findUnique({
        where: {
            idhistorique: idhistorique
        }
    });

    if (!historique) {
        throw new Error("Historique introuvable.");
    }

    await prisma.historique.delete({
        where: {
            idhistorique: idhistorique
        }
    });
};