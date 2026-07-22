import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Catalogue() {
  const [livres, setLivres] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [recherche, setRecherche] = useState("");

  useEffect(() => { chargerLivres(); }, []);

  const chargerLivres = async () => {
    try {
      const response = await api.get("/livres");
      setLivres(response.data.filter((livre) => livre.statut === "VALIDE"));
    } catch (error) {
      console.error(error);
    } finally {
      setChargement(false);
    }
  };

  const livresFiltres = livres.filter((livre) => {
    const texte = recherche.toLowerCase();
    return (
      livre.titre.toLowerCase().includes(texte) ||
      livre.categorie.toLowerCase().includes(texte) ||
      livre.auteur?.nomcomplet.toLowerCase().includes(texte)
    );
  });

  if (chargement) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Chargement...</h2>;

  return (
    <div>
      {/* BARRE FIXE */}
      <div style={{ position: "sticky", top: 0, backgroundColor: "white", padding: "20px", zIndex: 1000, boxShadow: "0 2px 10px rgba(0,0,0,.15)" }}>
        <h1 style={{ textAlign: "center", color: "#1e3a8a" }}>Catalogue des livres</h1>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <input type="text" placeholder="🔍 Rechercher un livre..." value={recherche} onChange={(e) => setRecherche(e.target.value)} style={{ width: "500px", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }} />
        </div>
      </div>

      {/* LISTE DES LIVRES */}
      <div style={{ padding: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "25px" }}>
        {livresFiltres.map((livre) => (
          <div key={livre.idlivre} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "15px", boxShadow: "0 3px 8px rgba(0,0,0,.1)" }}>
            <img src={livre.couverture ? `http://localhost:3000/uploads/${livre.couverture}` : "https://via.placeholder.com/220x300?text=Couverture"} alt={livre.titre} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }} />
            <h3 style={{ color: "#1e3a8a", marginTop: "15px" }}>{livre.titre}</h3>
            <p><strong>Auteur :</strong> {livre.auteur?.nomcomplet}</p>
            <p><strong>Catégorie :</strong> {livre.categorie}</p>
            <p><strong>Langue :</strong> {livre.langue}</p>
            <p>{livre.resume}</p>
            <Link to={`/livre/${livre.idlivre}`}>
              <button style={{ width: "100%", padding: "10px", marginTop: "15px", backgroundColor: "#1e3a8a", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Voir le livre</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;