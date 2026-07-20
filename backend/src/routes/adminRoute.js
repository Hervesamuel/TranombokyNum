import roleMiddleware from "../middleware/roleMiddleware.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
// Route réservée uniquement à l'ADMIN
router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("ADMIN"),
    (req, res) => {
        res.json({
            message: "Bienvenue Administrateur."
        });
    }
);

export default router;