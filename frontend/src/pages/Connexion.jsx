import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { DASHBOARD_PAR_ROLE } from "../utils/roles";

// Regex stricte de validation email (format standard)
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Connexion() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [erreurs, setErreurs] = useState({});
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const { connexion } = useAuth();
  const { afficherToast } = useToast();
  const navigate = useNavigate();

  // Validation avant envoi
  const valider = () => {
    const nouvellesErreurs = {};
    if (!REGEX_EMAIL.test(email)) {
      nouvellesErreurs.email = "Adresse email invalide";
    }
    if (mdp.trim().length < 6) {
      nouvellesErreurs.mdp = "Le mot de passe doit contenir au moins 6 caractères";
    }
    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const handleSubmit = async () => {
    if (!valider()) return;

    setEnvoiEnCours(true);
    try {
      const user = await connexion(email, mdp);
      afficherToast(`Bienvenue ${user.nomcomplet} !`, "succes");
      navigate(DASHBOARD_PAR_ROLE[user.role] || "/");
    } catch (err) {
      afficherToast(err.response?.data?.message || "Email ou mot de passe incorrect", "erreur");
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 32, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <h2 style={{ color: "#1e3a8a", marginBottom: 24 }}>Connexion</h2>

      <label style={{ display: "block", marginBottom: 4, fontSize: 14, color: "#374151" }}>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, borderRadius: 6, border: `1px solid ${erreurs.email ? "#dc2626" : "#d1d5db"}`, marginBottom: 4 }}
      />
      {erreurs.email && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{erreurs.email}</p>}

      <label style={{ display: "block", marginTop: 12, marginBottom: 4, fontSize: 14, color: "#374151" }}>Mot de passe</label>
      <input
        type="password"
        value={mdp}
        onChange={(e) => setMdp(e.target.value)}
        style={{ width: "100%", padding: 10, borderRadius: 6, border: `1px solid ${erreurs.mdp ? "#dc2626" : "#d1d5db"}`, marginBottom: 4 }}
      />
      {erreurs.mdp && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{erreurs.mdp}</p>}

      <button
        onClick={handleSubmit}
        disabled={envoiEnCours}
        style={{ width: "100%", marginTop: 20, padding: 12, borderRadius: 8, border: "none", backgroundColor: "#1e3a8a", color: "#fff", fontWeight: 600, cursor: "pointer" }}
      >
        {envoiEnCours ? "Connexion..." : "Se connecter"}
      </button>

      <p style={{ marginTop: 16, textAlign: "center", fontSize: 14 }}>
        Pas de compte ? <Link to="/inscription" style={{ color: "#1e3a8a" }}>Inscrivez-vous</Link>
      </p>
    </div>
  );
}

export default Connexion;