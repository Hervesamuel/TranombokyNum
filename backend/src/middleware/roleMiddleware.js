/*=========================================
    Middleware de vérification des rôles
==========================================*/
const roleMiddleware = (...rolesAutorises) => {

    return (req, res, next) => {
        console.log(req.user);
        console.log("Role demandé :", rolesAutorises);

        // Vérifier si l'utilisateur est authentifié
        if (!req.user) {
            return res.status(401).json({
                message: "Utilisateur non authentifié."
            });
        }

        // Vérifier si son rôle est autorisé
        if (!rolesAutorises.includes(req.user.role)) {
            return res.status(403).json({
                message: "Accès interdit."
            });
        }

        // Continuer
        next();
    };

};

export default roleMiddleware;