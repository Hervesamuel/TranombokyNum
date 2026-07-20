import api from "./api";

// Connexion : envoie email/mdp (nom exact attendu par le backend), reçoit token + utilisateur
export const login = async (email, mdp) => {
  const { data } = await api.post("/utilisateurs/login", { email, mdp });
  return data; // { token, utilisateur }
};

export const register = async (infosUtilisateur) => {
  const { data } = await api.post("/utilisateurs/register", infosUtilisateur);
  return data;
};

export const getProfil = async () => {
  const { data } = await api.get("/utilisateurs/profil");
  return data;
};