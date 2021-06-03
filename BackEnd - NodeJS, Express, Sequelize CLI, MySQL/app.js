// DECLARATION DES VARIABLES ET DES PACKAGES

require('dotenv').config();                         // importation du package "dotenv"
const express = require('express');                 // importation du package "express"
//const helmet = require('helmet');                   // importation du package "helmet"
const path = require('path');                       // importation du package "path"
//const cors = require('cors');                       // importation du package "cors"

// Importation et déclaration des routes pour "user", "profile", "admin, "message", "comment" et "report"

const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");
const messageRoutes = require("./routes/message.routes");
const commentRoutes = require("./routes/comment.routes");
const reportRoutes = require("./routes/report.routes");

// Déclaration de l'application via Express
const app = express();

//Connection à la base de données
require('./database/connection');

// Paramétrage des entêtes (Headers) qui configurent les actions à implémenter dans le CORS
app.use((req, res, next) => {
    // d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Origin', '*');
    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const db = require("./models");

db.sequelize.sync();

// Extraction de l'objet JSON des requètes entrantes
app.use(express.json({
    inflate: true,
    limit: '100kb',
    reviver: null,
    strict: true,
    type: 'application/json',
    verify: undefined
}))
app.use(express.urlencoded({ extended: false }))


// Utilisation de la route path pour reconnaître les requêtes images
app.use("/images", express.static(path.join(__dirname, "images")));

// Déclaration des API et de leurs routes respectives
//app.use("/api/init", initRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/", profileRoutes);
app.use("/api/admin/user", adminRoutes);
app.use("/api/", reportRoutes);
app.use("/api/", messageRoutes);
app.use("/api/message", commentRoutes);

// Configuration de la Sécurisation CORS
app.use(cors({
    origin: process.env.CLIENT_URL
})); 

// Sécurisation d'express en paramètrant les entêtes HTTP
app.use(helmet());

module.exports = app;