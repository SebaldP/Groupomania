// DECLARATION DES VARIABLES ET DES PACKAGES

const express = require('express');                 // importation du package "express"
const helmet = require('helmet');                   // importation du package "helmet"
const cors = require('cors');                       // importation du package "cors"

// Importation et déclaration des routes pour "user", "profile", "admin, "message", "comment" et "report"

const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");
const messageRoutes = require("./routes/message.routes");
const commentRoutes = require("./routes/comment.routes");
const reportRoutes = require("./routes/report.routes");

// Déclaration de l'application via Express
const app = express();

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

// Extraction de l'objet JSON des requètes entrantes
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Configuration de la Sécurisation CORS
app.use(cors({
    origin: "http://localhost:8080"
})); 

// Sécurisation d'express en paramètrant les entêtes HTTP
app.use(helmet());

// Déclaration des API et de leurs routes respectives
app.use("/api/user", userRoutes);
app.use("/api/user/", profileRoutes);
app.use("/api/admin/user", adminRoutes);
app.use("/api/", reportRoutes);
app.use("/api/", messageRoutes);
app.use("/api/message", commentRoutes);

module.exports = app;