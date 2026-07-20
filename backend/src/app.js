import express from "express";
import cors from "cors";

import utilisateurRoute from "./routes/utilisateurRoute.js";
import adminRoute from "./routes/adminRoute.js";
import auteurRoute from "./routes/auteurRoute.js";
import livreRoute from "./routes/livreRoute.js";
import favorisRoute from "./routes/favorisRoute.js";
import commentaireRoute from "./routes/commentaireRoute.js";
import historiqueRoute from "./routes/historiqueRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import progressionLectureRoute from "./routes/progressionLectureRoute.js";


const app = express();

// Route APU Admin
app.use("/api/admin", adminRoute);
// Middlewares
app.use(cors());
app.use(express.json());

// Route principale
app.get("/", (req, res) => {
    res.send("Bienvenue sur le backend de TranombokyNum");
});

// Routes API Utilisateurs
app.use("/api/utilisateurs", utilisateurRoute);
// Route API d'auteur 
app.use("/api/auteurs", auteurRoute);
// Route API de LIVRE 
app.use("/api/livres", livreRoute);
// Routes des favoris
app.use("/api/favoris", favorisRoute);
// Routes des commentaires
app.use("/api/commentaires", commentaireRoute);
// Routes de la progression de lecture
app.use("/api/progression", progressionLectureRoute);
// Routes de l'historique
app.use("/api/historique", historiqueRoute);
// Routes de notification
app.use("/api/notifications", notificationRoute);

export default app;
