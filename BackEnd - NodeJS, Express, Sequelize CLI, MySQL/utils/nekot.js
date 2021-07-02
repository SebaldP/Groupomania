// fonction de décryptage de token pour extraire "id" et "isAdmin" de User

const jwt = require("jsonwebtoken");

module.exports = {
    userId: (req) => {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        return userId;
    },
    isAdmin: (req) => {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const adminId = decodedToken.isAdmin;
        return adminId;
    },
};