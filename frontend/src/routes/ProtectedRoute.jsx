import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children, rolesAutorises }) {
  const { utilisateur, chargement } = useAuth();

  if (chargement) return null; // évite un flash pendant la vérif du token

  if (!utilisateur) return <Navigate to="/connexion" replace />;

  if (rolesAutorises && !rolesAutorises.includes(utilisateur.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;