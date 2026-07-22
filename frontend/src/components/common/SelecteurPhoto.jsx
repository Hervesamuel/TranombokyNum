import { useRef, useState } from "react";

// photoActuelle : URL existante (mode édition) | onChangeFichier : callback(file)
function SelecteurPhoto({ photoActuelle, onChangeFichier }) {
  const inputRef = useRef(null);
  const [apercu, setApercu] = useState(photoActuelle || null);

  const handleClicAvatar = () => {
    inputRef.current.click(); // déclenche l'ouverture native du sélecteur de fichiers
  };

  const handleFichierChoisi = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    // Vérification stricte du type avant même d'envoyer au backend
    if (!["image/png", "image/jpeg"].includes(fichier.type)) {
      alert("Seuls les fichiers PNG et JPG sont acceptés.");
      return;
    }

    setApercu(URL.createObjectURL(fichier)); // aperçu immédiat
    onChangeFichier(fichier); // remonte le fichier réel au parent
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        onClick={handleClicAvatar}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          margin: "0 auto",
          cursor: "pointer",
          overflow: "hidden",
          backgroundColor: "#1e3a8a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 13,
          border: "2px dashed #93c5fd",
        }}
      >
        {apercu ? (
          <img src={apercu} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          "Ajouter photo"
        )}
      </div>

      {/* Input caché : c'est lui qui ouvre l'explorateur de fichiers de l'appareil */}
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFichierChoisi}
        style={{ display: "none" }}
      />

      <p style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>PNG ou JPG, 3 Mo max</p>
    </div>
  );
}

export default SelecteurPhoto;