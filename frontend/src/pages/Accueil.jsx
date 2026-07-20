import { Link } from "react-router-dom";

function Accueil() {
  // Données temporaires, à remplacer par un appel API /api/livres plus tard
  const livresEnVedette = [
    { id: 1, titre: "Ibonia", auteur: "Conte traditionnel", genre: "Légende" },
    { id: 2, titre: "Le Vazimba de la forêt", auteur: "Rina R.", genre: "Conte" },
    { id: 3, titre: "Contes du crépuscule malgache", auteur: "Naly A.", genre: "Recueil" },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ padding: "60px 32px", textAlign: "center", background: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)" }}>
        <h1 style={{ fontSize: 36, color: "#1e3a8a", marginBottom: 16 }}>
          Découvrez les contes et livres malgaches
        </h1>
        <p style={{ fontSize: 18, color: "#374151", maxWidth: 600, margin: "0 auto 32px" }}>
          Lisez, partagez et redécouvrez le patrimoine littéraire de Madagascar, où que vous soyez.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Link to="/catalogue" style={{ padding: "12px 28px", borderRadius: 8, backgroundColor: "#1e3a8a", color: "#fff", textDecoration: "none", fontWeight: 600 }}>
            Explorer le catalogue
          </Link>
          <Link to="/inscription" style={{ padding: "12px 28px", borderRadius: 8, border: "2px solid #1e3a8a", color: "#1e3a8a", textDecoration: "none", fontWeight: 600 }}>
            Créer un compte
          </Link>
        </div>
      </div>

      {/* Section livres en vedette - remplit l'espace + donne un aperçu réel du catalogue */}
      <div style={{ padding: "48px 32px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, color: "#1e3a8a", marginBottom: 24, textAlign: "center" }}>
          Livres en vedette
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {livresEnVedette.map((livre) => (
            <Link
              key={livre.id}
              to={`/livre/${livre.id}`}
              style={{
                display: "block",
                padding: 20,
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                textDecoration: "none",
                transition: "box-shadow 0.2s",
              }}
            >
              <p style={{ fontSize: 12, color: "#1e3a8a", fontWeight: 600, marginBottom: 6 }}>{livre.genre}</p>
              <p style={{ fontSize: 16, color: "#111827", fontWeight: 600, marginBottom: 4 }}>{livre.titre}</p>
              <p style={{ fontSize: 14, color: "#6b7280" }}>{livre.auteur}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Section valeurs / pourquoi Tranombokynum */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, padding: "0 32px 64px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: 16 }}>
          <p style={{ fontSize: 15, color: "#374151" }}>Contes validés par la communauté</p>
        </div>
        <div style={{ textAlign: "center", padding: 16 }}>
          <p style={{ fontSize: 15, color: "#374151" }}>Reprenez votre lecture où vous vous êtes arrêté</p>
        </div>
        <div style={{ textAlign: "center", padding: 16 }}>
          <p style={{ fontSize: 15, color: "#374151" }}>Auteurs malgaches mis en avant</p>
        </div>
      </div>
    </div>
  );
}

export default Accueil;