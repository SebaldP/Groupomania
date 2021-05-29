const nekot = require("../utils/nekot");

module.exports = (req, res, next) => {
    try {
        const userId = nekot.userId(req);
        const isAdmin = nekot.isAdmin(req);

        if (req.body.userId && req.body.userId !== userId) {
            throw "L'identifiant de l'utilisateur est incompatible !"
        } else {
            if (isAdmin === true) {
                next()
            } else {
                return res.status(401).json({ error: "Accès refusé !", })
            }
        }
    }
    catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !'});
    }
};