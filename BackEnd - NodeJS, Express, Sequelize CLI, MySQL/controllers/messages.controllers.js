const nekot = require("../utils/nekot");

const models = require("../models");

exports.createMessage = (req, res, next) => {
    const userId = nekot.userId(req);
    if (req.body.title === "" || req.body.content === "") {
        return res.status(400).json({ alert: "Merci de remplir tous les champs." });
    }
    models.Message.create({
        idUsers: userId,
        title: req.body.title,
        content: req.body.content,
    })
        .then(() => res.status(201).json({ message: "Publication enregistrée !" }))
        .catch((error) => res.status(400).json({ error: error, alert: "Création de publication indisponible !" }))
    ;
};

exports.getAllMessages = (req, res, next) => {
    models.Message.findAll({
        order: [["updatedAt", "DESC"]],
        attributes: [
            "id",
            "idUsers",
            "title",
            "createdAt",
            "updatedAt",
        ],
        include: 
        [
            {
                model: models.User,
                attributes: ["pseudonym"],
            },
        ],
    })
        .then((messages) => { res.status(200).json(messages); })
        .catch((error) => { res.status(400).json({ error: error, alert: "Publications introuvables !"}); })
    ;
};

exports.getOneMessage = (req, res, next) => {
    models.Message.findOne({
        attributes: [
            "id",
            "idUsers",
            "title",
            "content",
            "createdAt",
            "updatedAt",
        ],
        where: 
        { 
            id: req.params.id 
        },
        include: 
        [
            {
                model: models.User,
                attributes: ["pseudonym", "image"],
            },
        ],
    })
        .then((message) => { res.status(200).json(message); })
        .catch((error) => { res.status(404).json({ error: error, alert: "Publication introuvable !"}); })
    ;
};

exports.modifyMessage = (req, res, next) => {
    const userId = nekot.userId(req);
    models.Message.findOne({
        where: { id: req.params.id },
    })
        .then((message) => {
            if (message.idUsers === userId) {
                message.update({
                    title: req.body.title,
                    content: req.body.content,
                })
                    .then(() => { res.status(200).json({ message: "Publication mise à jour !", }); })
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
    const userId = nekot.userId(req);
    const isAdmin = nekot.isAdmin(req);
    models.Message.findOne({ where: { id: req.params.id }, })
        .then((message) => {
            if (message.idUsers === userId || isAdmin === true) {
                message.destroy()
                    .then(() => { res.status(200).json({ message: "Publication supprimée !", }); })
                    .catch((error) => { res.status(400).json({
                        error: error,
                        alert: "La publication n'a pas pu être supprimé !",
                    });})
                ;
            } else {
                return res.status(401).json({alert:"Accès refusé ! Vous n'avez pas l'autorisation nécessaire pour supprimer la publication !"})
            };
        })
        .catch((error) => { res.status(400).json({ error: error, alert: "Publication introuvable !"}); })
    ;
};