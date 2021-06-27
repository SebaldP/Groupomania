const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comments.controllers");

const _auth = require("../middleware/auth");
const _validator = require("../middleware/validator");

router.get("/:id/comments", _auth, commentCtrl.getAllComments); // Récupérer les commentaires rattachés à un message précis
router.post("/:id/comment", _auth, _validator.createAndUpdateComment, commentCtrl.createComment); // Créer un commentaire, pour un message précis
router.put("/:idMessages/comment/:id", _auth, _validator.createAndUpdateComment, commentCtrl.modifyComment); // Modifier un commentaire précis, pour un message précis
router.delete("/:idMessages/comment/:id", _auth, commentCtrl.deleteComment); // Supprimer un commentaire précis, pour un message précis

module.exports = router;