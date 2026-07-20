function Footer() {
  return (
    <footer style={{ backgroundColor: "#1e3a8a", color: "#fff", padding: "32px", marginTop: 48 }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24, maxWidth: 1000, margin: "0 auto" }}>
        <div>
          <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Tranombokynum</p>
          <p style={{ fontSize: 13, color: "#bfdbfe" }}>Contes et livres malgaches en ligne</p>
        </div>

        <div>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Navigation</p>
          <p style={{ fontSize: 13, color: "#bfdbfe", marginBottom: 4 }}>Accueil</p>
          <p style={{ fontSize: 13, color: "#bfdbfe", marginBottom: 4 }}>Catalogue</p>
          <p style={{ fontSize: 13, color: "#bfdbfe" }}>Inscription</p>
        </div>

        <div>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Compte</p>
          <p style={{ fontSize: 13, color: "#bfdbfe", marginBottom: 4 }}>Mon profil</p>
          <p style={{ fontSize: 13, color: "#bfdbfe" }}>Mes favoris</p>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: 12, color: "#93c5fd", marginTop: 24 }}>
        © {new Date().getFullYear()} Tranombokynum — Tous droits réservés
      </p>
    </footer>
  );
}

export default Footer;