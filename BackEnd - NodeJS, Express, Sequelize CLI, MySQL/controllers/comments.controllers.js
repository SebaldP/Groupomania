const nekot = require("../utils/nekot");
const models = require("../models");

exports.createComment = (req, res, next) => {
    const userId = nekot.userId(req);
    if (req.body.comment === "") {
        return res.status(400).json({ error: "Merci de remplir le champ commentaire." });
    }
    models.Comment.create({
        idUsers: userId,
        idMessages: req.params.id,
        comment: req.body.comment,
    })
        .then(() => res.status(200).json({ message: "Commentaire enregistré !" }))
        .catch((error) => res.status(500).json({error: error, alert: "Problème serveur !"}));
};

exports.modifyComment = (req, res, next) => {
    const userId = nekot.userId(req);
    models.Comment.findOne({
        where: { id: req.params.id },
    })
        .then((comment) => {
            if (comment.idUsers === userId) {
                comment.update({
                    comment: req.body.comment,
                })
                    .then(() => { res.status(200).json({ message: "Commentaire mis à jour !", }); })
                    .catch((error) => { res.status(400).json({
                        error: error,
                        alert: "La mise à jour du commentaire a échoué !",
                    });})
                ;
            } else {
                return res.status(401).json({alert:"Accès refusé ! Vous n'avez pas l'autorisation nécessaire pour modifier le commentaire !"})
            };
        })
        .catch((error) => { res.status(400).json({ error: error, alert: "Commentaire introuvable !", }); })
    ;
};

exports.getAllComments = (req, res, next) => {
    models.Comment.findAll({
        where: 
        {
            idMessages: req.params.id,
        },
        order: [["updatedAt", "DESC"]],
        include: 
        [
            {
                model: models.User,
                attributes: ["pseudonym", "image"],
            },
        ],
    })
        .then((comments) => { res.status(200).json(comments); })
        .catch((error) => { res.status(400).json({ error: error, alert: "Données introuvables !"}); })
    ;
};

exports.deleteComment = (req, res, next) => {
    const userId = nekot.userId(req);
    const isAdmin = nekot.isAdmin(req);
    models.Comment.findOne({
        where: 
        {
            idMessages: req.params.idMessages,
            id: req.params.id,
        },
    })
        .then((comment) => {
            if (comment.idUsers === userId || isAdmin === true) {
                comment.destroy()
                    .then(() => { res.status(200).json({ message: "Commentaire supprimé !", }); })
                    .catch((error) => { res.status(400).json({
                        error: error,
                        alert: "Le commentaire n'a pas pu être supprimé",
                    });})
                ;
            } else { 
                return res.status(403).json({ alert: "Accès refusé !", })
            };
        })
        .catch((error) => { res.status(400).json({ alert: "Commentaire introuvable !", error: error, }); })
    ;
};