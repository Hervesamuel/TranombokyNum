// Importation de Prisma
import prisma from "../config/prisma.js";

/*=========================================
        Ajouter un favori
==========================================*/
export const ajouterFavori = async (iduser, idlivre) => {

    // Vérifier si le livre existe
    const livre = await prisma.livre.findUnique({
        where: {
            idlivre: idlivre
        }
    });

    if (!livre) {
        throw new Error("Livre introuvable.");
    }

    // Vérifier si le favori existe déjà
    const favoriExiste = await prisma.favoris.findFirst({
        where: {
            iduser: iduser,
            idlivre: idlivre
        }
    });

    if (favoriExiste) {
        throw new Error("Ce livre est déjà dans vos favoris.");
    }

    // Ajouter le favori
    return await prisma.favoris.create({
        data: {
            iduser: iduser,
            idlivre: idlivre
        },
        include: {
            utilisateur: true,
            livre: true
        }
    });

};

/*=========================================
        Mes favoris
==========================================*/
export const getMesFavoris = async (iduser) => {

    return await prisma.favoris.findMany({

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
            dateajout: "desc"
        }

    });

};

/*=========================================
        Supprimer un favori
==========================================*/
export const supprimerFavori = async (iduser, idlivre) => {

    // Vérifier si le favori existe
    const favori = await prisma.favoris.findFirst({

        where: {
            iduser: iduser,
            idlivre: idlivre
        }

    });

    if (!favori) {
        throw new Error("Favori introuvable.");
    }

    // Supprimer le favori
    await prisma.favoris.delete({

        where: {
            idfavoris: favori.idfavoris
        }

    });

};