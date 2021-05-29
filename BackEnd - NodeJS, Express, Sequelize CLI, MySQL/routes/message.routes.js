const express = require("express");
const router = express.Router();
const multer = require("multer");

const messageCtrl = require("../controllers/messages.controllers");

const _auth = require("../middleware/auth");
const _validator = require("../middleware/validator");

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension)
    },
})

const uploadStorage = multer({ storage: storage })

router.get("messages/", _auth, messageCtrl.getAllMessages); // Récupérer les messages, publiés sur le serveur
router.get("message/:id", _auth, messageCtrl.getOneMessage); // Récupérer un message précis, publié sur le serveur
router.post("message/", _auth, _validator.createAndUpdateMessage, uploadStorage.single("file"), messageCtrl.createMessage); // Publier un message
router.put("message/:id", _auth, _validator.createAndUpdateMessage, uploadStorage.single("file"), messageCtrl.modifyMessage); // Modifier un message
router.delete("message/:id", _auth, messageCtrl.deleteMessage); // Supprimer un message

module.exports = router;