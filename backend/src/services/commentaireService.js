import prisma from "../config/prisma.js";

/*=========================================
        Ajouter un commentaire
==========================================*/
export const ajouterCommentaire = async (iduser, data) => {
    // Vérifier si le livre existe
    const livre = await prisma.livre.findUnique({
        where: {
            idlivre: data.idlivre
        }
    });

    if (!livre) {
        throw new Error("Livre introuvable.");
    }

    // Création du commentaire
    return await prisma.commentaire.create({
        data: {
            contenu: data.contenu,
            iduser: iduser,
            idlivre: data.idlivre
        },
        include: {
            utilisateur: true,
            livre: true
        }
    });
};

/*=========================================
        Tous les commentaires d'un livre
==========================================*/
export const getCommentairesLivre = async (idlivre) => {
    return await prisma.commentaire.findMany({
        where: {
            idlivre: idlivre
        },
        include: {
            utilisateur: {
                select: {
                    nomcomplet: true,
                    photo: true
                }
            }
        },
        orderBy: {
            datecom: "desc"
        }
    });
};

/*=========================================
        Modifier un commentaire
==========================================*/
export const modifierCommentaire = async (iduser, idcom, data) => {
    const commentaire = await prisma.commentaire.findUnique({
        where: {
            idcom: idcom
        }
    });

    if (!commentaire) {
        throw new Error("Commentaire introuvable.");
    }

    // Seul le propriétaire peut modifier
    if (commentaire.iduser !== iduser) {
        throw new Error("Vous ne pouvez pas modifier ce commentaire.");
    }

    return await prisma.commentaire.update({
        where: {
            idcom: idcom
        },
        data: {
            contenu: data.contenu
        }
    });
};

/*=========================================
        Supprimer un commentaire
==========================================*/
export const supprimerCommentaire = async (iduser, idcom) => {
    const commentaire = await prisma.commentaire.findUnique({
        where: {
            idcom: idcom
        }
    });

    if (!commentaire) {
        throw new Error("Commentaire introuvable.");
    }

    // Seul le propriétaire peut supprimer
    if (commentaire.iduser !== iduser) {
        throw new Error("Vous ne pouvez pas supprimer ce commentaire.");
    }

    await prisma.commentaire.delete({
        where: {
            idcom: idcom
        }
    });
};