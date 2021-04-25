// DECLARATION DES VARIABLES ET DES PACKAGES

const express = require('express');                 // importation du package "express": node.js web framework
//const bodyParser = require('body-parser');          // importation du package "body-parser": parse incoming request bodies in a middleware before handlers, available under the req.body property.
const cookieParser = require("cookie-parser");      // importation du package "cookie-parser": pour lire les cookies
const helmet = require('helmet');                   // importation du package "helmet": 13 middleware pour sécuriser les données et les connexions.
const path = require('path');                       // importation du package "path": provides a way of working with directories and file paths.
const cors = require('cors');                       // importation du package "cors": manage cross-origin resource sharing
const rateLimit = require('express-rate-limit');    // importation du package "express-rate-limit": on va fixer un taux limite pour les requêtes, afin de protéger le système contre le "brute force".
const toobusy = require("toobusy-js");              // importation du package "toobusy": il empêche le Denial of Service (DoS) en monitorant l'event loop

// Importation et déclaration des routes pour "user", "profile", "message" et "comment", du dossier "routes"
const messageRoutes = require("./routes/message.routes");
const commentRoutes = require("./routes/comment.routes");
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");

// Déclaration de l'application via Express
const app = express();

// Extraction de l'objet JSON des requètes entrantes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Utilisation de la route path pour reconnaître les requêtes images
app.use("/images", express.static(path.join(__dirname, "images")));

// Déclaration des API et de leurs routes respectives
app.use("/api/auth", userRoutes);
app.use("/api/auth", profileRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/messages", commentRoutes);

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

// Configuration de la Sécurisation CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    preflightContinue: false,
}));

// Sécurisation d'express en paramètrant les entêtes HTTP
app.use(helmet());

// Configuration de la Sécurisation contre la Force Brute
app.use(rateLimit({         
    windowMs : 25 * 60 * 1000, // 25 minutes
    max: 5, 
    message: "Vous avez dépassé le nombre maximal de tentatives, merci de réessayer ultérieurement."
}));

// Configuration de la Sécurisation contre les surchauffes du serveur
app.use((req, res, next) => {
    if (toobusy()) {
        res.send(503, "Le serveur est saturé !");
    } else {
        next();
    }
});

module.exports = app;