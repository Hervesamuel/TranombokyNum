import prisma from "../config/prisma.js";

/*=========================================
        Enregistrer la progression
==========================================*/
export const enregistrerProgression = async (iduser, data) => {
    // Vérifier si le livre existe
    const livre = await prisma.livre.findUnique({
        where: {
            idlivre: data.idlivre
        }
    });

    if (!livre) {
        throw new Error("Livre introuvable.");
    }

    // Chercher une progression existante
    const progression = await prisma.progressionlecture.findUnique({
        where: {
            iduser_idlivre: {
                iduser: iduser,
                idlivre: data.idlivre
            }
        }
    });

    // Si elle existe, on met à jour
    if (progression) {
        return await prisma.progressionlecture.update({
            where: {
                iduser_idlivre: {
                    iduser: iduser,
                    idlivre: data.idlivre
                }
            },
            data: {
                pagecourante: data.pagecourante,
                datedernierelecture: new Date()
            }
        });
    }

    // Sinon on crée une nouvelle progression
    return await prisma.progressionlecture.create({
        data: {
            iduser: iduser,
            idlivre: data.idlivre,
            pagecourante: data.pagecourante
        }
    });
};

/*=========================================
        Obtenir la progression d'un livre
==========================================*/
export const getProgressionLivre = async (iduser, idlivre) => {
    const progression = await prisma.progressionlecture.findUnique({
        where: {
            iduser_idlivre: {
                iduser: iduser,
                idlivre: idlivre
            }
        }
    });

    if (!progression) {
        throw new Error("Aucune progression trouvée.");
    }

    return progression;
};

/*=========================================
        Supprimer la progression
==========================================*/
export const supprimerProgression = async (iduser, idlivre) => {
    const progression = await prisma.progressionlecture.findUnique({
        where: {
            iduser_idlivre: {
                iduser: iduser,
                idlivre: idlivre
            }
        }
    });

    if (!progression) {
        throw new Error("Progression introuvable.");
    }

    await prisma.progressionlecture.delete({
        where: {
            iduser_idlivre: {
                iduser: iduser,
                idlivre: idlivre
            }
        }
    });
};