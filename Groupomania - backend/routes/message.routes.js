const express = require("express");
const router = express.Router();

const messageCtrl = require("../controllers/message.controllers");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, messageCtrl.getAllMessage); // Récupérer les messages, publiés sur le serveur
router.get("/:id", auth, messageCtrl.getOneMessage); // Récupérer un message précis, publié sur le serveur
router.post("/", auth, multer, messageCtrl.createMessage); // Publier un message
router.delete("/:id", auth, messageCtrl.deleteMessage); // Supprimer un message

module.exports = router;