import api from "./api";

/*=========================================
        Ajouter un favori
==========================================*/
export const ajouterFavori = async (idlivre) => {
  const { data } = await api.post("/favoris", {
    idlivre,
  });

  return data;
};

/*=========================================
        Mes favoris
==========================================*/
export const getMesFavoris = async () => {
  const { data } = await api.get("/favoris");

  return data;
};

/*=========================================
        Supprimer un favori
==========================================*/
export const supprimerFavori = async (idlivre) => {
  const { data } = await api.delete(`/favoris/${idlivre}`);

  return data;
};