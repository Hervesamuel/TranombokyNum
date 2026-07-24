  import { Link } from "react-router-dom";

  function Auteur() {
    return (
      <div style={{ padding: "80px 30px 30px 30px", background: "#cbdaf8ff", minHeight: "100vh"}}>
        <h1 style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#f5f7fb", padding: "15px 30px", borderRadius : "20px", margin: 0, color: "#1e3a8a", zIndex: 1000, boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
          Tableau de bord Auteur
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px", marginBottom: "40px" }}>
          <div style={card}><h2>📚</h2><h3>Mes livres</h3><h1>0</h1></div>
          <div style={card}><h2>⏳</h2><h3>En attente</h3><h1>0</h1></div>
          <div style={card}><h2>✅</h2><h3>Validés</h3><h1>0</h1></div>
          <div style={card}><h2>❌</h2><h3>Refusés</h3><h1>0</h1></div>
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Link to="/auteur/ajouter-livre"><button style={btn}>➕ Ajouter un livre</button></Link>
          <Link to="/auteur/mes-livres"><button style={btn}>📖 Mes livres</button></Link>
        </div>
      </div>
    );
  }

  const card = { background: "white", borderRadius: "12px", padding: "25px", textAlign: "center", boxShadow: "0 3px 12px rgba(0,0,0,.1)" };
  const btn = { padding: "14px 28px", border: "none", borderRadius: "10px", background: "#1e3a8a", color: "white", cursor: "pointer", fontSize: "16px", fontWeight: "bold" };

  export default Auteur;