const express = require("express");
const router = express.Router();

const reportCtrl = require("../controllers/reports.controllers");

const _auth = require("../middleware/auth");
const _moderatorAuth = require("../middleware/moderator_auth");
//const _validator = require("../middleware/validator");

// Routes de l'API "report"

router.get("/reports", _moderatorAuth, reportCtrl.getAllReports); // Afficher les signalements envoyés par les utilisateurs (réservé à l'administrat.eur.rice)
router.post("/report", _auth, /*_validator.createReport,*/ reportCtrl.createReport); // Envoyer un signalement
router.delete("/report/:id", _moderatorAuth, reportCtrl.deleteReport); // Supprimer un signalement précis (réservé à l'administrat.eur.rice)

module.exports = router;