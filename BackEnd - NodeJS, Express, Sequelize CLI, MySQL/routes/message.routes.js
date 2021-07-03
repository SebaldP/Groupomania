const express = require("express");
const router = express.Router();

const messageCtrl = require("../controllers/messages.controllers");

const _auth = require("../middleware/auth");
//const _validator = require("../middleware/validator");

// Routes de l'API "message"

router.get("/messages", _auth, messageCtrl.getAllMessages); // Récupérer les messages, publiés sur le serveur
router.get("/message/:id", _auth, messageCtrl.getOneMessage); // Récupérer un message précis, publié sur le serveur
router.post("/message", _auth, /*_validator.createAndUpdateMessage,*/ messageCtrl.createMessage); // Publier un message
router.put("/message/:id", _auth, /*_validator.createAndUpdateMessage,*/ messageCtrl.modifyMessage); // Modifier un message
router.delete("/message/:id", _auth, messageCtrl.deleteMessage); // Supprimer un message

module.exports = router;