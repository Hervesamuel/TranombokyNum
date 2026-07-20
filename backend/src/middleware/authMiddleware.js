// Importation de JWT
import jwt from "jsonwebtoken";

/*=========================================
    Middleware de vérification du Token
==========================================*/
const authMiddleware = (req, res, next) => {

    // Récupérer le Header Authorization
    const authHeader = req.headers.authorization;

    // Vérifier si le Token est présent
    if (!authHeader) {
        return res.status(401).json({
            message: "Accès refusé. Token manquant."
        });
    }

    // Vérifier le format : Bearer TOKEN
    const token = authHeader.split(" ")[1];
    console.log(token);

    try {

        // Vérifier le Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Sauvegarder les informations de l'utilisateur
        req.user = decoded;

        // Passer au middleware suivant
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Token invalide ou expiré."
        });

    }

};



export default authMiddleware;