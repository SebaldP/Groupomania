// fonction de décryptage de token pour extraire "id" et "isAdmin" de User

const jwt = require("jsonwebtoken");

module.exports = {
    userId: (req) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        return userId;
    },
    isAdmin: (req) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const isAdmin = decodedToken.isAdmin;
        return isAdmin;
    },
    isModerator: (req) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const isModerator = decodedToken.isModerator;
        return isModerator;
    },
};