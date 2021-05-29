const jwt = require("jsonwebtoken"); //Permet de créer un token utilisateur

module.exports = {
    userId: (req) => {
        const token = req.headers.authorization.split(" ")[1]; //On extrait le token de l'entête dans la requête
        const decodedToken = jwt.verify(token, process.env.TOKEN); //On décrypte le token grâce à la clé secrète
        const userId = decodedToken.userId; //On récupère l'userId du token décrypté
        return userId;
    },
    isAdmin: (req) => {
        const token = req.headers.authorization.split(" ")[1]; //On extrait le token de la requête
        const decodedToken = jwt.verify(token, process.env.TOKEN); //On décrypte le token grâce à la clé secrète
        const adminId = decodedToken.is_admin; //On récupère l'isAdmin du token décrypté
        return adminId;
    },
};