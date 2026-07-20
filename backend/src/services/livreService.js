// Importation de Prisma
import prisma from "../config/prisma.js";

/*=========================================
        Ajouter un livre
==========================================*/
export const ajouterLivre = async (data) => {
    // Vérifier si l'auteur existe
    const auteur = await prisma.auteur.findUnique({
        where: {
            idaut: data.idaut
        }
    });

    if (!auteur) {
        throw new Error("Auteur introuvable.");
    }

    // Création du livre
    return await prisma.livre.create({
        data: {
            titre: data.titre,
            resume: data.resume || null,
            nbrpage: data.nbrpage,
            datepub: new Date(data.datepub),
            categorie: data.categorie,
            langue: data.langue,
            couverture: data.couverture || null,
            fichierPdf: data.fichierPdf || null,
            statut: "EN_ATTENTE",
            idaut: data.idaut
        },
        include: {
            auteur: true
        }
    });
};

/*=========================================
        Obtenir tous les livres
==========================================*/
export const getTousLesLivres = async () => {
    return await prisma.livre.findMany({
        include: {
            auteur: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

/*=========================================
        Obtenir un livre par ID
==========================================*/
export const getLivreParId = async (id) => {
    const livre = await prisma.livre.findUnique({
        where: {
            idlivre: id
        },
        include: {
            auteur: true
        }
    });

    if (!livre) {
        throw new Error("Livre introuvable.");
    }

    return livre;
};

/*=========================================
        Modifier un livre
==========================================*/
export const modifierLivre = async (id, data) => {
    const livre = await prisma.livre.findUnique({
        where: {
            idlivre: id
        }
    });

    if (!livre) {
        throw new Error("Livre introuvable.");
    }

    // Vérifier que le nouvel auteur existe
    const auteur = await prisma.auteur.findUnique({
        where: {
            idaut: data.idaut
        }
    });

    if (!auteur) {
        throw new Error("Auteur introuvable.");
    }

    return await prisma.livre.update({
        where: {
            idlivre: id
        },
        data: {
            titre: data.titre,
            resume: data.resume,
            nbrpage: data.nbrpage,
            datepub: new Date(data.datepub),
            categorie: data.categorie,
            langue: data.langue,
            couverture: data.couverture,
            fichierPdf: data.fichierPdf,
            statut: data.statut,
            idaut: data.idaut
        },
        include: {
            auteur: true
        }
    });
};

/*=========================================
        Supprimer un livre
==========================================*/
export const supprimerLivre = async (id) => {
    const livre = await prisma.livre.findUnique({
        where: {
            idlivre: id
        }
    });

    if (!livre) {
        throw new Error("Livre introuvable.");
    }

    await prisma.livre.delete({
        where: {
            idlivre: id
        }
    });
};

/*=========================================
        Valider un livre
==========================================*/
export const validerLivre = async (id) => {
    // Vérifier si le livre existe
    const livre = await prisma.livre.findUnique({
        where: {
            idlivre: id
        }
    });

    if (!livre) {
        throw new Error("Livre introuvable.");
    }

    // Mettre à jour le statut
    return await prisma.livre.update({
        where: {
            idlivre: id
        },
        data: {
            statut: "VALIDE"
        },
        include: {
            auteur: true
        }
    });
};

/*=========================================
        Refuser un livre
==========================================*/
export const refuserLivre = async (id) => {
    // Vérifier si le livre existe
    const livre = await prisma.livre.findUnique({
        where: {
            idlivre: id
        }
    });

    if (!livre) {
        throw new Error("Livre introuvable.");
    }

    // Mettre à jour le statut
    return await prisma.livre.update({
        where: {
            idlivre: id
        },
        data: {
            statut: "REFUSE"
        },
        include: {
            auteur: true
        }
    });
};