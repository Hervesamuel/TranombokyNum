import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import * as authService from "../services/authService";

function Profil() {
  const { deconnexion } = useAuth();
  const { afficherToast } = useToast();

  const [profil, setProfil] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [modeEdition, setModeEdition] = useState(false);
  const [form, setForm] = useState({ nomcomplet: "", genre: "", adresse: "" });
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  useEffect(() => {
    const chargerProfil = async () => {
      try {
        const { utilisateur } = await authService.getProfil(); // on lit bien .utilisateur
        setProfil(utilisateur);
        setForm({
          nomcomplet: utilisateur.nomcomplet || "",
          genre: utilisateur.genre || "",
          adresse: utilisateur.adresse || "",
        });
      } catch (err) {
        afficherToast("Impossible de charger le profil", "erreur");
      } finally {
        setChargement(false);
      }
    };
    chargerProfil();
  }, []);

  const handleEnregistrer = async () => {
    setEnvoiEnCours(true);
    try {
      const { utilisateur } = await authService.updateProfil(form);
      setProfil(utilisateur);
      setModeEdition(false);
      afficherToast("Profil mis à jour", "succes");
    } catch (err) {
      afficherToast("Erreur lors de la mise à jour", "erreur");
    } finally {
      setEnvoiEnCours(false);
    }
  };

  if (chargement) return <p style={{ textAlign: "center", padding: 48, color: "#6b7280" }}>Chargement du profil...</p>;
  if (!profil) return <p style={{ textAlign: "center", padding: 48, color: "#dc2626" }}>Profil introuvable.</p>;

  const initiales = profil.nomcomplet?.split(" ").map((m) => m[0]).slice(0, 2).join("").toUpperCase();
  const styleInput = { width: "100%", padding: 10, borderRadius: 6, border: "1px solid #d1d5db", marginBottom: 12 };

  return (
    <div style={{ maxWidth: 500, margin: "48px auto", padding: 32, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#1e3a8a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 600 }}>
          {initiales}
        </div>
        <div>
          <p style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0 }}>{profil.nomcomplet}</p>
          <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 12, backgroundColor: "#dbeafe", color: "#1e3a8a", fontWeight: 600 }}>
            {profil.role}
          </span>
        </div>
      </div>

      {!modeEdition ? (
        <>
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <InfoLigne label="Email" valeur={profil.email} />
            <InfoLigne label="Genre" valeur={profil.genre || "Non renseigné"} />
            <InfoLigne label="Adresse" valeur={profil.adresse || "Non renseignée"} />
          </div>
          <button onClick={() => setModeEdition(true)} style={{ width: "100%", marginTop: 20, padding: 12, borderRadius: 8, border: "none", backgroundColor: "#1e3a8a", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
            Modifier mon profil
          </button>
        </>
      ) : (
        <>
          <label style={{ fontSize: 14, color: "#374151" }}>Nom complet</label>
          <input style={styleInput} value={form.nomcomplet} onChange={(e) => setForm({ ...form, nomcomplet: e.target.value })} />

          <label style={{ fontSize: 14, color: "#374151" }}>Genre</label>
          <select style={styleInput} value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })}>
            <option value="">Sélectionner...</option>
            <option value="Masculin">Masculin</option>
            <option value="Féminin">Féminin</option>
            <option value="Autre">Autre</option>
          </select>

          <label style={{ fontSize: 14, color: "#374151" }}>Adresse</label>
          <input style={styleInput} value={form.adresse} onChange={(e) => setForm({ ...form, adresse: e.target.value })} />

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button onClick={handleEnregistrer} disabled={envoiEnCours} style={{ flex: 1, padding: 12, borderRadius: 8, border: "none", backgroundColor: "#1e3a8a", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
              {envoiEnCours ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button onClick={() => setModeEdition(false)} style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #d1d5db", backgroundColor: "transparent", color: "#374151", cursor: "pointer" }}>
              Annuler
            </button>
          </div>
        </>
      )}

      <button onClick={deconnexion} style={{ width: "100%", marginTop: 24, padding: 12, borderRadius: 8, border: "1px solid #dc2626", backgroundColor: "transparent", color: "#dc2626", fontWeight: 600, cursor: "pointer" }}>
        Se déconnecter
      </button>
    </div>
  );
}

function InfoLigne({ label, valeur }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
      <span style={{ color: "#6b7280" }}>{label}</span>
      <span style={{ color: "#111827", fontWeight: 500 }}>{valeur}</span>
    </div>
  );
}

export default Profil;