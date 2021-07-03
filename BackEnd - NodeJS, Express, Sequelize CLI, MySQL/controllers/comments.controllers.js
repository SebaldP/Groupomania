const nekot = require("../utils/nekot");

const models = require("../models");

exports.createComment = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    const userId = nekot.userId(req);
    if (req.body.comment === "") {
        return res.status(400).json({ error: "Merci de remplir le champ commentaire." });
    }
    models.Comment.create({
        idUsers: userId,
        idMessages: req.params.id,
        comment: req.body.comment,
    })
        .then((result) => {res.status(200).json({ result: result, message: "Commentaire enregistré !" })})
        .catch((error) => {res.status(500).json({error: error, alert: "Problème serveur !"})});
};

exports.modifyComment = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    const userId = nekot.userId(req);
    models.Comment.findByPk(req.params.id)
        .then((comment) => {
            if (!comment){
                return res.status(404).json({ alert: "Données introuvables !"});
            };
            if (comment.idUsers === userId) {
                comment.update({
                    comment: req.body.comment,
                })
                    .then((result) => { res.status(200).json({ result: result, message: "Commentaire mis à jour !", }); })
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
    console.log(req.headers);
console.log(req.body);
    models.Comment.findAll({
        order: [["updatedAt", "DESC"]],
        where: 
        {
            idMessages: req.params.id
        },
        include: 
        [
            {
                model: models.User,
                attributes: ["pseudonym"]
            }
        ]
    })
        .then((result) => {
            if (!result){
                return res.status(404).json({ alert: "Données introuvables !"});
            };
            res.status(200).json(result); 
        })
        .catch((error) => { res.status(500).json({ error: error, alert: "Problème serveur !"}); })
    ;
};

exports.deleteComment = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
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
                    .then((result) => { res.status(200).json({ result: result, message: "Commentaire supprimé !", }); })
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