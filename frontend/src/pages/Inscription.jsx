import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { ROLES } from "../utils/roles";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Inscription() {
  const [form, setForm] = useState({
    nomcomplet: "",
    email: "",
    mdp: "",
    confirmationMdp: "",
    genre: "",
    adresse: "",
    role: ROLES.LECTEUR, // valeur par défaut
  });
  const [erreurs, setErreurs] = useState({});
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const { connexion } = useAuth();
  const { afficherToast } = useToast();
  const navigate = useNavigate();

  // Met à jour un champ du formulaire
  const handleChange = (champ, valeur) => {
    setForm((prev) => ({ ...prev, [champ]: valeur }));
  };

  // Validation stricte de chaque champ avant envoi
  const valider = () => {
    const e = {};
    if (form.nomcomplet.trim().length < 3) {
      e.nomcomplet = "Le nom complet doit contenir au moins 3 caractères";
    }
    if (!REGEX_EMAIL.test(form.email)) {
      e.email = "Adresse email invalide";
    }
    if (form.mdp.length < 6) {
      e.mdp = "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (form.confirmationMdp !== form.mdp) {
      e.confirmationMdp = "Les mots de passe ne correspondent pas";
    }
    if (!form.genre) {
      e.genre = "Veuillez sélectionner un genre";
    }
    setErreurs(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!valider()) return;

    setEnvoiEnCours(true);
    try {
      // On ne renvoie pas confirmationMdp au backend, ce n'est qu'un contrôle frontend
      const { confirmationMdp, ...donneesAEnvoyer } = form;
      await connexion; // (pas utilisé ici, l'inscription se fait via authService plus bas)

      const authService = await import("../services/authService");
      await authService.register(donneesAEnvoyer);

      afficherToast("Compte créé avec succès, connectez-vous", "succes");
      navigate("/connexion");
    } catch (err) {
      afficherToast(err.response?.data?.message || "Erreur lors de l'inscription", "erreur");
    } finally {
      setEnvoiEnCours(false);
    }
  };

  // Style réutilisé pour tous les inputs (cohérence + code court)
  const styleInput = (champErreur) => ({
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: `1px solid ${champErreur ? "#dc2626" : "#d1d5db"}`,
    marginBottom: 4,
  });

  return (
    <div style={{ maxWidth: 440, margin: "48px auto", padding: 32, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <h2 style={{ color: "#1e3a8a", marginBottom: 24 }}>Créer un compte</h2>

      <label style={{ display: "block", marginBottom: 4, fontSize: 14, color: "#374151" }}>Nom complet</label>
      <input
        type="text"
        value={form.nomcomplet}
        onChange={(e) => handleChange("nomcomplet", e.target.value)}
        style={styleInput(erreurs.nomcomplet)}
      />
      {erreurs.nomcomplet && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{erreurs.nomcomplet}</p>}

      <label style={{ display: "block", marginTop: 12, marginBottom: 4, fontSize: 14, color: "#374151" }}>Email</label>
      <input
        type="email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        style={styleInput(erreurs.email)}
      />
      {erreurs.email && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{erreurs.email}</p>}

      <label style={{ display: "block", marginTop: 12, marginBottom: 4, fontSize: 14, color: "#374151" }}>Mot de passe</label>
      <input
        type="password"
        value={form.mdp}
        onChange={(e) => handleChange("mdp", e.target.value)}
        style={styleInput(erreurs.mdp)}
      />
      {erreurs.mdp && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{erreurs.mdp}</p>}

      <label style={{ display: "block", marginTop: 12, marginBottom: 4, fontSize: 14, color: "#374151" }}>Confirmer le mot de passe</label>
      <input
        type="password"
        value={form.confirmationMdp}
        onChange={(e) => handleChange("confirmationMdp", e.target.value)}
        style={styleInput(erreurs.confirmationMdp)}
      />
      {erreurs.confirmationMdp && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{erreurs.confirmationMdp}</p>}

      <label style={{ display: "block", marginTop: 12, marginBottom: 4, fontSize: 14, color: "#374151" }}>Genre</label>
      <select
        value={form.genre}
        onChange={(e) => handleChange("genre", e.target.value)}
        style={styleInput(erreurs.genre)}
      >
        <option value="">Sélectionner...</option>
        <option value="Masculin">Masculin</option>
        <option value="Féminin">Féminin</option>
        <option value="Autre">Autre</option>
      </select>
      {erreurs.genre && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{erreurs.genre}</p>}

      <label style={{ display: "block", marginTop: 12, marginBottom: 4, fontSize: 14, color: "#374151" }}>Adresse (optionnel)</label>
      <input
        type="text"
        value={form.adresse}
        onChange={(e) => handleChange("adresse", e.target.value)}
        style={styleInput(false)}
      />

      <label style={{ display: "block", marginTop: 12, marginBottom: 4, fontSize: 14, color: "#374151" }}>Je m'inscris en tant que</label>
      <select
        value={form.role}
        onChange={(e) => handleChange("role", e.target.value)}
        style={styleInput(false)}
      >
        <option value={ROLES.LECTEUR}>Lecteur</option>
        <option value={ROLES.AUTEUR}>Auteur</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={envoiEnCours}
        style={{ width: "100%", marginTop: 20, padding: 12, borderRadius: 8, border: "none", backgroundColor: "#1e3a8a", color: "#fff", fontWeight: 600, cursor: "pointer" }}
      >
        {envoiEnCours ? "Création..." : "Créer mon compte"}
      </button>

      <p style={{ marginTop: 16, textAlign: "center", fontSize: 14 }}>
        Déjà un compte ? <Link to="/connexion" style={{ color: "#1e3a8a" }}>Connectez-vous</Link>
      </p>
    </div>
  );
}

export default Inscription;