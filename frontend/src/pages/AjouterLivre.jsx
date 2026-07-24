import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AjouterLivre() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ titre: "", resume: "", categorie: "", langue: "", nbrpage: "", datepub: "" });
  const [couverture, setCouverture] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (couverture) formData.append("couverture", couverture);
      if (pdf) formData.append("fichierPdf", pdf);

      await ajouterLivre(formData);
      alert("Livre envoyé avec succès.");
      navigate("/auteur");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Erreur lors de l'ajout.");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 0 15px rgba(0,0,0,.1)" }}>
      <h2 style={{ textAlign: "center", color: "#1e3a8a" }}>Ajouter un livre</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre</label>
        <input type="text" name="titre" value={form.titre} onChange={handleChange} required />
        <label>Résumé</label>
        <textarea rows="6" name="resume" value={form.resume} onChange={handleChange} />
        <label>Catégorie</label>
        <input type="text" name="categorie" value={form.categorie} onChange={handleChange} />
        <label>Langue</label>
        <input type="text" name="langue" value={form.langue} onChange={handleChange} />
        <label>Nombre de pages</label>
        <input type="number" name="nbrpage" value={form.nbrpage} onChange={handleChange} />
        <label>Date de publication</label>
        <input type="date" name="datepub" value={form.datepub} onChange={handleChange} />
        <label>Couverture</label>
        <input type="file" accept="image/*" onChange={(e) => setCouverture(e.target.files[0])} />
        <label>Livre PDF</label>
        <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} />
        <button type="submit" style={{ width: "100%", marginTop: "25px", padding: "12px", border: "none", borderRadius: "8px", background: "#1e3a8a", color: "white", fontSize: "16px", cursor: "pointer" }}>Publier le livre</button>
      </form>
    </div>
  );
}

export default AjouterLivre;