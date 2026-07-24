import api from "./api";
/*==============================
    Liste des livres
===============================*/
export const getTousLesLivres = async () => {
  const { data } = await api.get("/livres");
  return data;
};

/*==============================
    Un livre par ID
===============================*/
export const getLivreParId = async (id) => {
  const { data } = await api.get(`/livres/${id}`);
  return data;
};

/*==============================
    Ajouter un livre
===============================*/
export const ajouterLivre = async (formData) => {
  const { data } = await api.post("/livres", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

/*==============================
    Mes livres
===============================*/
// export const getMesLivres = async () => {
//   const { data } = await api.get("/livres/mes-livres");
//   return data;
// };

/*==============================
    Modifier un livre
===============================*/
export const modifierLivre = async (id, formData) => {
  const { data } = await api.put(`/livres/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

/*==============================
    Supprimer un livre
===============================*/
export const supprimerLivre = async (id) => {
  const { data } = await api.delete(`/livres/${id}`);
  return data;
};

/*=========================================
        Mes livres (Auteur connecté)
==========================================*/
export const getMesLivres = async (iduser) => {

    // Rechercher l'auteur lié à cet utilisateur
    const auteur = await prisma.auteur.findUnique({
        where: {
            utilisateurIduser: iduser
        }
    });

    if (!auteur) {
        throw new Error("Auteur introuvable.");
    }

    return await prisma.livre.findMany({
        where: {
            idaut: auteur.idaut
        },
        include: {
            auteur: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

};

// const livres = await prisma.livre.findMany({
//     where:{
//         idaut:auteur.idaut
//     }
// });