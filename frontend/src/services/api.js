import axios from "axios";

// URL de base de l'API backend (Node.js + Express)
const API_URL = "http://localhost:3000/api";

// Instance Axios réutilisée partout dans l'app
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur de REQUÊTE : ajoute le token JWT à chaque appel si présent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de REPONSE : si le token est invalide/expiré (401), on déconnecte l'utilisateur
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/connexion";
    }
    return Promise.reject(error);
  }
);

export default api;