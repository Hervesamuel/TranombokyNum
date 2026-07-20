import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { DASHBOARD_PAR_ROLE } from "../../utils/roles";

function Navbar() {
  const { utilisateur, deconnexion } = useAuth();
  const { afficherToast } = useToast();
  const navigate = useNavigate();

  const handleDeconnexion = () => {
    deconnexion();
    afficherToast("Vous êtes déconnecté", "info");
    navigate("/");
  };

  return (
    <nav style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 32px",
  backgroundColor: "#1e3a8a",
  color: "#fff",
  position: "sticky",   // reste collée en haut au scroll
  top: 0,
  zIndex: 100,          // passe au-dessus du contenu qui scroll
}}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: 20, color: "#fff", textDecoration: "none" }}>
        Tranombokynum
      </Link>

      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Accueil</Link>
        <Link to="/catalogue" style={{ color: "#fff", textDecoration: "none" }}>Catalogue</Link>

        {utilisateur ? (
          <>
            <Link to="/favoris" style={{ color: "#fff", textDecoration: "none" }}>Favoris</Link>
            <Link to="/historique" style={{ color: "#fff", textDecoration: "none" }}>Historique</Link>
            <Link to="/notifications" style={{ color: "#fff", textDecoration: "none" }}>Notifications</Link>
            <Link to="/profil" style={{ color: "#fff", textDecoration: "none" }}>Profil</Link>
            <Link to={DASHBOARD_PAR_ROLE[utilisateur.role]} style={{ color: "#93c5fd", textDecoration: "none" }}>
              Mon espace
            </Link>
            <button onClick={handleDeconnexion} style={{ padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", backgroundColor: "#dc2626", color: "#fff" }}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/connexion" style={{ color: "#fff", textDecoration: "none" }}>Connexion</Link>
            <Link to="/inscription" style={{ padding: "6px 14px", borderRadius: 6, backgroundColor: "#fff", color: "#1e3a8a", textDecoration: "none", fontWeight: 600 }}>
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}


export default Navbar;