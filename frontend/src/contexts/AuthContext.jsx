import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Utilisateur connecté (null si pas connecté)
  const [utilisateur, setUtilisateur] = useState(null);
  // Chargement initial (vérification du token au démarrage)
  const [chargement, setChargement] = useState(true);

  // Au montage : on récupère l'utilisateur stocké en localStorage s'il existe
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStocke = localStorage.getItem("user");
    if (token && userStocke) {
      setUtilisateur(JSON.parse(userStocke));
    }
    setChargement(false);
  }, []);

  // Connexion : appelle l'API, stocke le token + l'utilisateur
const connexion = async (email, mdp) => {
  const { token, utilisateur: user } = await authService.login(email, mdp);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  setUtilisateur(user);
  return user;
};

  // Deconnexion : nettoie le localStorage et l'état
  const deconnexion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUtilisateur(null);
  };

  return (
    <AuthContext.Provider value={{ utilisateur, connexion, deconnexion, chargement }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pratique pour utiliser le contexte (à appeler DANS un composant, jamais à l'extérieur — comme sur Nexa !)
export function useAuth() {
  return useContext(AuthContext);
}