import express from "express";
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    
});
app.use("/upload", express.static("public/upload"));