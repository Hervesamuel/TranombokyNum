// Importation de Prisma
import prisma from "../config/prisma.js";

/*=========================================
        Ajouter un auteur
==========================================*/
export const ajouterAuteur = async (data) => {
    // Vérifier si l'email existe déjà
    const auteurExiste = await prisma.auteur.findUnique({
        where: {
            email: data.email
        }
    });

    if (auteurExiste) {
        throw new Error("Cet email est déjà utilisé.");
    }

    // Création de l'auteur
    return await prisma.auteur.create({
        data: {
            nomcomplet: data.nomcomplet,
            surnom: data.surnom || null,
            datenaissance: data.datenaissance
                ? new Date(data.datenaissance)
                : null,
            datedece: data.datedece
                ? new Date(data.datedece)
                : null,
            adresse: data.adresse || null,
            biographie: data.biographie || null,
            genre: data.genre,
            email: data.email
        }
    });
};

/*=========================================
        Obtenir tous les auteurs
==========================================*/
export const getTousLesAuteurs = async () => {
    return await prisma.auteur.findMany({
        orderBy: {
            nomcomplet: "asc"
        }
    });
};

/*=========================================
        Obtenir un auteur par ID
==========================================*/
export const getAuteurParId = async (id) => {
    const auteur = await prisma.auteur.findUnique({
        where: {
            idaut: id
        }
    });

    if (!auteur) {
        throw new Error("Auteur introuvable.");
    }

    return auteur;
};

/*=========================================
        Modifier un auteur
==========================================*/
export const modifierAuteur = async (id, data) => {
    // Vérifier si l'auteur existe
    const auteur = await prisma.auteur.findUnique({
        where: {
            idaut: id
        }
    });

    if (!auteur) {
        throw new Error("Auteur introuvable.");
    }

    // Vérifier si le nouvel email appartient à un autre auteur
    if (data.email) {
        const emailExiste = await prisma.auteur.findFirst({
            where: {
                email: data.email,
                NOT: {
                    idaut: id
                }
            }
        });

        if (emailExiste) {
            throw new Error("Cet email est déjà utilisé.");
        }
    }

    // Mise à jour
    return await prisma.auteur.update({
        where: {
            idaut: id
        },
        data: {
            nomcomplet: data.nomcomplet,
            surnom: data.surnom,
            datenaissance: data.datenaissance
                ? new Date(data.datenaissance)
                : null,
            datedece: data.datedece
                ? new Date(data.datedece)
                : null,
            adresse: data.adresse,
            biographie: data.biographie,
            genre: data.genre,
            email: data.email
        }
    });
};

/*=========================================
        Supprimer un auteur
==========================================*/
export const supprimerAuteur = async (id) => {
    const auteur = await prisma.auteur.findUnique({
        where: {
            idaut: id
        }
    });

    if (!auteur) {
        throw new Error("Auteur introuvable.");
    }

    await prisma.auteur.delete({
        where: {
            idaut: id
        }
    });
};