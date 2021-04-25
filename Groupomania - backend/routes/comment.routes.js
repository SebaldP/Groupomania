const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment.controllers");

const auth = require("../middleware/auth");

router.get("/:id/comments", auth, commentCtrl.getAllComment); // Récupérer les commentaires rattachés à un message précis
router.post("/:id/comment/", auth, commentCtrl.createComment); // Créer un commentaire, pour un message précis
router.delete("/:idMessages/comment/:id", auth, commentCtrl.deleteComment); // Supprimer un commentaire précis, pour un message précis

module.exports = router;