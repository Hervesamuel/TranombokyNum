import api from "./api";

export const login = async (email, mdp) => {
  const { data } = await api.post("/utilisateurs/login", { email, mdp });
  return data;
};

export const register = async (formData) => {
  const { data } = await api.post("/utilisateurs/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getProfil = async () => {
  const { data } = await api.get("/utilisateurs/profil");
  return data;
};

export const updateProfil = async (formData) => {
  const { data } = await api.put("/utilisateurs/profil", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};