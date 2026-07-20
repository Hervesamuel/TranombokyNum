
import prisma from "../config/prisma.js";
// Importation de bcrypt (chiffrement des mots de passe)
import bcrypt from "bcrypt";
// Importation de JWT
import jwt from "jsonwebtoken";

/*=========================================
    INSCRIPTION DE DES UTILISATEUR 
==========================================*/
export const registerService = async (data) => {

    // Vérifier si l'email existe déjà
    const utilisateurExiste = await prisma.utilisateur.findUnique({
        where: {
            email: data.email
        }
    });

    if (utilisateurExiste) {
        throw new Error("Cet email est déjà utilisé.");
    }

    // Chiffrer le mot de passe
    const motDePasseHash = await bcrypt.hash(data.mdp, 10);

    // Création de l'utilisateur
    const utilisateur = await prisma.utilisateur.create({
        data: {
            nomcomplet: data.nomcomplet,
            email: data.email,
            mdp: motDePasseHash,
            photo: data.photo,
            genre: data.genre,
            adresse: data.adresse,
            role: data.role
        }
    });

    return {
        message: "Utilisateur créé avec succès.",
        utilisateur
    };
};

/*=========================================
    Connexion d'un utilisateur
==========================================*/
export const loginService = async (data) => {

    // Rechercher l'utilisateur par son email
    const utilisateur = await prisma.utilisateur.findUnique({
        where: {
            email: data.email
        }
    });

    if (!utilisateur) {
        throw new Error("Email ou mot de passe incorrect.");
    }

    // Vérifier le mot de passe
    const motDePasseCorrect = await bcrypt.compare(
        data.mdp,
        utilisateur.mdp
    );

    if (!motDePasseCorrect) {
        throw new Error("Email ou mot de passe incorrect.");
    }

    // Générer le Token JWT
    const token = jwt.sign(

        {
            iduser: utilisateur.iduser,
            role: utilisateur.role,
            email: utilisateur.email
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "1d"
        }

    );

    return {
        message: "Connexion réussie.",
        token,
        utilisateur
    };

};