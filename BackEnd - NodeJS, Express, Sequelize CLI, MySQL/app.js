// DECLARATION DES VARIABLES ET DES PACKAGES

const express = require('express');                 // importation du package "express"
const helmet = require('helmet');                   // importation du package "helmet"
const cors = require('cors');                       // importation du package "cors"
const xss = require('xss-clean');                   // importation du package "xss-clean"

// Importation et déclaration des routes pour "user", "profile", "admin, "message", "comment" et "report"

const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");
const messageRoutes = require("./routes/message.routes");
const commentRoutes = require("./routes/comment.routes");
const reportRoutes = require("./routes/report.routes");

// Déclaration de l'application via Express
const app = express();

// Nettoyage des entrées utilisateur provenant du corps POST, des requêtes GET et des paramètres d'URL
app.use(xss());

// Sécurisation d'express en paramètrant les entêtes HTTP
app.use(helmet());

// Extraction de l'objet JSON des requètes entrantes
app.use(express.json()); // Pour lire le format application/JSON
app.use(express.urlencoded({ extended: true })); // Pour lire le format application/x-www-form-urlencoded

// Paramétrage des entêtes (Headers) qui configurent les actions à implémenter dans le CORS
app.use((req, res, next) => {
    // d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Origin', '*');
    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, XKey, Authorization');
    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    next();
});

// Configuration de la Sécurisation CORS
app.use(cors({
    origin: process.env.CLIENT_URL
})); 

// Déclaration des API et de leurs routes respectives
app.use("/api/user", userRoutes);
app.use("/api/user/", profileRoutes);
app.use("/api/admin/user", adminRoutes);
app.use("/api/", reportRoutes);
app.use("/api/", messageRoutes);
app.use("/api/message", commentRoutes);

module.exports = app;