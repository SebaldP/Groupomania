const nekot = require("../utils/nekot");

const models = require("../models");

exports.createMessage = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    const userId = nekot.userId(req);
    if (req.body.title === "" || req.body.content === "") {
        return res.status(400).json({ alert: "Merci de remplir tous les champs." });
    }
    models.Message.create({
        idUsers: userId,
        title: req.body.title,
        content: req.body.content,
    })
        .then((result) => {res.status(201).json({ result: result, message: "Publication enregistrée !" })})
        .catch((error) => {res.status(400).json({ error: error, alert: "Création de publication indisponible !" })})
    ;
};

exports.getAllMessages = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    models.Message.findAll({
        order: [["updatedAt", "DESC"]],
        include: 
        [
            {
                model: models.User,
                attributes: ["pseudonym", "isModerator", "avatar"]
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

exports.getOneMessage = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    models.Message.findOne({
        where: {
            id: req.params.id
        },
        include: 
        [
            {
                model: models.User,
                attributes: ["pseudonym", "avatar", "isModerator"]
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

exports.modifyMessage = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    const userId = nekot.userId(req);
    models.Message.findOne({where: {id: req.params.id}})
        .then((message) => {
            if (!message){
                return res.status(404).json({ alert: "Données introuvables !"});
            };
            if (message.idUsers === userId) {
                message.update({
                    title: req.body.title,
                    content: req.body.content,
                })
                    .then((result) => { res.status(200).json({ result: result, message: "Publication mise à jour !", }); })
                    .catch((error) => { res.status(400).json({
                        error: error,
                        alert: "La mise à jour de la publication a échoué !",
                    });})
                ;
            } else {
                return res.status(401).json({alert:"Accès refusé ! Vous n'avez pas l'autorisation nécessaire pour modifier la publication !"})
            };
        })
        .catch((error) => { res.status(400).json({ error: error, alert: "Publication introuvable !"}); })
    ;
};

exports.deleteMessage = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    const userId = nekot.userId(req);
    const isModerator = nekot.isModerator(req);
    models.Message.findOne({where: {id: req.params.id}})
        .then((message) => {
            if (!message){
                return res.status(404).json({ alert: "Données introuvables !"});
            };
            if (message.idUsers === userId || isModerator === true) {
                message.destroy()
                    .then((result) => { res.status(200).json({ result: result, message: "Publication supprimée avec tous les commentaires !", }); })
                    .catch((error) => { res.status(400).json({
                        error: error,
                        alert: "La publication n'a pas pu être supprimée !",
                    });})
                ;
            } else {
                return res.status(401).json({alert:"Accès refusé ! Vous n'avez pas l'autorisation nécessaire pour supprimer la publication !"})
            };
        })
        .catch((error) => { res.status(400).json({ error: error, alert: "Publication introuvable !"}); })
    ;
};