const express = require('express');
const router = express.Router();

const profileCtrl = require("../controllers/profiles.controllers");

const auth = require("../middleware/auth");

// Routes de l'API "user"

router.get("/profile/:id", auth, profileCtrl.getOneProfile); // Récupérer les infos de l'utilisateur, afin de les afficher sur sa fiche
router.get("/profile/:id/messages", auth, profileCtrl.getAllMessagesProfile); // Récupérer tous les messages d'un utilisateur
router.put("/profile/:id", auth, profileCtrl.modifyProfile); // Mettre à jour les informations du compte de l'utilisateur
router.delete("/profile/:id", auth, profileCtrl.deleteProfile); // Supprimer son compte

module.exports = router;