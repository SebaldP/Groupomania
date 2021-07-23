const express = require('express');
const router = express.Router();

const adminCtrl = require("../controllers/admin.controllers");

const _adminAuth = require("../middleware/admin_auth");
//const _validator = require("../middleware/validator");

// Routes de l'API "admin"

router.post("/", _adminAuth, /*_validator.createUser,*/ adminCtrl.createUser); // Créer un compte d'utilisat.eur.rice
router.delete("/:registration", _adminAuth, adminCtrl.deleteUser); // Supprimer un compte d'utilisat.eur.rice

module.exports = router;