import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLivreParId } from "../services/LivreService";

function LivreDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livre, setLivre] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => { chargerLivre(); }, []);

  const chargerLivre = async () => {
  try {
    const data = await getLivreParId(Number(id));
    setLivre(data);
  }
   catch (err) {
    console.log(err.response?.data);
    console.log(err.response?.status);
    console.log(err);
  } 
  finally {
    setChargement(false);
  }
};

  if (chargement) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Chargement...</h2>;
  if (!livre) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Livre introuvable.</h2>;

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "30px" }}>
      <button onClick={() => navigate(-1)} style={{ padding: "10px 20px", marginBottom: "25px", border: "none", borderRadius: "8px", background: "#1e3a8a", color: "white", cursor: "pointer" }}>← Retour</button>
      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
        <img src={livre.couverture ? `http://localhost:3000/uploads/${livre.couverture}` : "https://via.placeholder.com/300x450"} alt={livre.titre} style={{ width: "300px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,.2)" }} />
        <div style={{ flex: 1 }}>
          <h1 style={{ color: "#1e3a8a" }}>{livre.titre}</h1>
          <hr />
          <p><strong>Auteur :</strong> {livre.auteur?.nomcomplet}</p>
          <p><strong>Catégorie :</strong> {livre.categorie}</p>
          <p><strong>Langue :</strong> {livre.langue}</p>
          <p><strong>Nombre de pages :</strong> {livre.nbrpage}</p>
          <p><strong>Date de publication :</strong> {new Date(livre.datepub).toLocaleDateString()}</p>
          <h3>Résumé</h3>
          <p style={{ textAlign: "justify", lineHeight: "1.8" }}>{livre.resume}</p>
          <div style={{ display: "flex", gap: "20px", marginTop: "35px" }}>
            <button style={{ background: "#dc2626", color: "white", border: "none", padding: "12px 25px", borderRadius: "8px", cursor: "pointer" }}>❤️ Ajouter aux favoris</button>
            <Link to={`/lecture/${livre.idlivre}`}>
              <button style={{ background: "#15803d", color: "white", border: "none", padding: "12px 25px", borderRadius: "8px", cursor: "pointer" }}>📖 Lire maintenant</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LivreDetail;