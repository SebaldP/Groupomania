const express = require("express");
const router = express.Router();

const reportCtrl = require("../controllers/reports.controllers");

const _auth = require("../middleware/auth");
const _adminAuth = require("../middleware/admin_auth");
const _validator = require("../middleware/validator");

router.get("reports/", _adminAuth, reportCtrl.getAllReport); // Afficher les signalements envoyés par les utilisateurs (réservé à l'administrateur)
router.post("report/", _auth, _validator.createReport, reportCtrl.createReport); // Envoyer un signalement
router.delete("report/:id", _adminAuth, reportCtrl.deleteReport); // Supprimer un signalement précis (réservé à l'administrateur)

module.exports = router;