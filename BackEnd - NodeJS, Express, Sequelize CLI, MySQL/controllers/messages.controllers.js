const nekot = require("../utils/nekot");
const fs = require("fs");

const models = require("../models");

exports.createMessage = (req, res, next) => {
    const userId = nekot.userId(req);
    if (req.body.title === "" || req.body.content === "") {
        return res.status(400).json({ error: "Merci de remplir tous les champs." });
    }
    models.Message.create({
        idUsers: userId,
        title: req.body.title,
        content: req.body.content,
        image:
            req.body.content && req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null,
    })
        .then(() => res.status(201).json({ message: "Message enregistré !" }))
        .catch((error) => res.status(400).json({ error }))
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
                attributes: ["pseudonym", "image"],
            },
        ],
    })
        .then((messages) => { res.status(200).json(messages); })
        .catch((error) => { res.status(400).json({ error: error, }); })
    ;
};

exports.getOneMessage = (req, res, next) => {
    models.Message.findOne({
        attributes: [
            "id",
            "idUsers",
            "title",
            "content",
            "image",
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
        .catch((error) => { res.status(404).json({ error: error, }); })
    ;
};

exports.modifyMessage = (req, res, next) => {
    const userId = nekot.userId(req);
    models.Message.findOne({
        where: { id: req.params.id },
    })
        .then((message) => {
            if (message.idUsers === userId) {
                if (message.image !== null) {
                    const filename = message.image.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                        message.update({
                            title: req.body.title,
                            content: req.body.content,
                            image: req.body.content && req.file
                            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                            : null,
                        })
                            .then(() => res.status(200).json({ message: "Publication mise à jour !" }))
                            .catch((error) => res.status(400).json({ 
                                error: error,
                                message: "La mise à jour de la publication a échoué !",
                            }));
                    });
                } else {
                    message.update({
                        title: req.body.title,
                        content: req.body.content,
                    })
                        .then(() => { res.status(200).json({ message: "Publication mise à jour !", }); })
                        .catch((error) => { res.status(400).json({
                            error: error,
                            message: "La mise à jour de la publication a échoué !",
                        });})
                    ;
                }
            } else {
                return res.status(401).json({error:"Accès refusé ! Vous n'avez pas l'autorisation nécessaire pour modifier la publication !"})
            };
        })
        .catch((error) => { res.status(400).json({ error: error, }); })
    ;
};

exports.deleteMessage = (req, res, next) => {
    const userId = nekot.userId(req);
    const isAdmin = nekot.isAdmin(req);
    models.Message.findOne({ where: { id: req.params.id }, })
        .then((message) => {
            if (message.idUsers === userId || isAdmin === true) {
                if (message.image !== null) {
                    const filename = message.image.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {
                        message.destroy()
                            .then(() => res.status(200).json({ message: "Message et son image supprimés !" }))
                            .catch((error) => res.status(400).json({ 
                                error: error,
                                message: "Le message et son image n'ont pas pu être supprimés !",
                            }));
                    });
                } else {
                    message.destroy()
                        .then(() => { res.status(200).json({ message: "Message supprimé !", }); })
                        .catch((error) => { res.status(400).json({
                            error: error,
                            message: "Le message n'a pas pu être supprimé !",
                        });})
                    ;
                }
            } else {
                return res.status(401).json({error:"Accès refusé ! Vous n'avez pas l'autorisation nécessaire pour supprimer la publication !"})
            };
        })
        .catch((error) => { res.status(400).json({ error: error, }); })
    ;
};