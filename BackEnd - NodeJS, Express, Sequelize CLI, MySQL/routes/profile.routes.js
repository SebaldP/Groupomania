const express = require('express');
const router = express.Router();

const profileCtrl = require("../controllers/profiles.controllers");

const _auth = require("../middleware/auth");
//const _validator = require("../middleware/validator");

// Routes de l'API "user/profile"

router.get("/profiles", _auth, profileCtrl.getAllProfiles); // Récupérer toutes les infos des utilisateurs
router.get("/profile/:id", _auth, profileCtrl.getOneProfile); // Récupérer les infos de l'utilisat.eur.rice, afin de les afficher sur sa fiche
router.get("/profile/:id/messages", _auth, profileCtrl.getAllMessagesProfile); // Récupérer tous les messages d'un.e utilisat.eur.rice
router.put("/profile/:id", _auth, /*_validator.updateProfile,*/ profileCtrl.modifyProfile); // Mettre à jour les informations du compte de l'utilisat.eur.rice

module.exports = router;