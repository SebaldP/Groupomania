// Les requètes doivent comporter le token (dans le headers) et userId (dans le body), à chaque fois que ce middleware est utilisé

const nekot = require("../utils/nekot");

module.exports = (req, res, next) => {
    try {
        const userId = nekot.userId(req);

        if (req.body.userId && req.body.userId !== userId) {
            throw "L'identifiant de l'utilisateur est incompatible !"
        } else {
            next()
        }
    }
    catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !'});
    }
};