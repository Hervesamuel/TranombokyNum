import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMesFavoris, supprimerFavori } from "../services/favorisService";

function Favoris() {
  const [favoris, setFavoris] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => { chargerFavoris(); }, []);

  const chargerFavoris = async () => {
    try {
      const data = await getMesFavoris();
      setFavoris(data);
    } catch (error) {
      console.error(error);
      alert("Impossible de charger les favoris.");
    } finally {
      setChargement(false);
    }
  };

  const handleSupprimer = async (idlivre) => {
    if (!window.confirm("Supprimer ce livre des favoris ?")) return;
    try {
      await supprimerFavori(idlivre);
      setFavoris((ancien) => ancien.filter((f) => f.livre.idlivre !== idlivre));
      alert("Livre supprimé des favoris.");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Erreur lors de la suppression.");
    }
  };

  if (chargement) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Chargement...</h2>;

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#1e3a8a", marginBottom: "40px" }}>❤️ Mes livres favoris</h1>
      {favoris.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>Aucun livre dans vos favoris.</h3>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "25px" }}>
          {favoris.map((favori) => (
            <div key={favori.idfavoris} style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "15px", boxShadow: "0 5px 12px rgba(0,0,0,.1)" }}>
              <img src={favori.livre.couverture ? `http://localhost:3000/uploads/${favori.livre.couverture}` : "https://via.placeholder.com/250x320?text=Couverture"} alt={favori.livre.titre} style={{ width: "100%", height: "320px", objectFit: "cover", borderRadius: "10px" }} />
              <h3 style={{ color: "#1e3a8a", marginTop: "15px" }}>{favori.livre.titre}</h3>
              <p><strong>Auteur :</strong> {favori.livre.auteur?.nomcomplet}</p>
              <p><strong>Catégorie :</strong> {favori.livre.categorie}</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Link to={`/livre/${favori.livre.idlivre}`} style={{ flex: 1 }}>
                  <button style={{ width: "100%", padding: "10px", background: "#1e3a8a", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>📖 Voir</button>
                </Link>
                <button onClick={() => handleSupprimer(favori.livre.idlivre)} style={{ flex: 1, padding: "10px", background: "#dc2626", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>🗑 Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoris;