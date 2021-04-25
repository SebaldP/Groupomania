const express = require('express');
const router = express.Router();

const userCtrl = require("../controllers/users.controllers");

// Routes de l'API "user"

router.post("/signup", userCtrl.createUser); // Créer un compte
router.post("/login", userCtrl.loginUser); // Se connecter

module.exports = router;