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
