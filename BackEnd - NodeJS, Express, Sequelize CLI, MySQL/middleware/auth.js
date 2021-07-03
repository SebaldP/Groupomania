// Les requètes doivent comporter le token (dans le headers) et userId (dans le body), à chaque fois que ce middleware est utilisé

const nekot = require("../utils/nekot");

module.exports = (req, res, next) => {
    try {
        const userId = nekot.userId(req);
        const userIdQuery = parseInt(req.query.g);
        console.log({userIdQuery: userIdQuery,userIdToken: userId})

        if (!!userIdQuery && userIdQuery !== userId) {
            return res.status(401).json({ alert: "L'identifiant de l'utilisateur est incompatible !", }) 
        } else {
            next()
        }
    }
    catch (error) {
        res.status(401).json({ error: error, alert: "Requête non authentifiée !"});
    }
};