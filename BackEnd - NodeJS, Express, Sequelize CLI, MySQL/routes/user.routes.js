const express = require('express');
const router = express.Router();

const userCtrl = require("../controllers/users.controllers");

const _validator = require("../middleware/validator");

// Routes de l'API "user"

router.post("/login", _validator.loginUser, userCtrl.loginUser); // Se connecter
router.put("/reset-password", _validator.resetPassword, userCtrl.resetPasswordUser); // Réinitialiser le mot de passe d’un compte précis à sa première version (fourni par l'administrateur)

module.exports = router;