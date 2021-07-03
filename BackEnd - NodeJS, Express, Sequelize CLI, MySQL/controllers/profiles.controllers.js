require('dotenv').config();                         // importation du package "dotenv"

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nekot = require("../utils/nekot");

const models = require("../models");

exports.getAllProfiles = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    models.User.findAll({
        attributes: 
        [
            "id",
            "pseudonym",
            "image"
        ],
        where: {
            isAdmin: false
        },
        raw: true
    })
    .then((result) => {
        if (!result){
            return res.status(404).json({ alert: "Utilisateurs introuvables !"});
        };
        res.status(200).json(result);
    })
    .catch((error) => { res.status(500).json({ error: error, alert: "Problème serveur !"}); });
};

exports.getOneProfile = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    models.User.findOne({
        attributes: [
            "id",
            "pseudonym",
            "image"
        ],
        where: {
            id: req.params.id
        },
        raw: true,
    })
    .then((result) => {
        if (!result){
            return res.status(404).json({ alert: "Utilisateur introuvable !"});
        };
        res.status(200).json(result);
    })
    .catch((error) => { res.status(500).json({ error: error, alert: "Problème serveur !"}); });
};

exports.modifyProfile = (req, res) => {
    console.log(req.headers);
console.log(req.body);
    const userId = nekot.userId(req);
    if (req.body.pseudonym == "" || req.body.image == "") {
        return res.status(400).json({ alert: "Merci de remplir tous les champs !" });
    }
    models.User.finmodelsyPk(req.params.id)
        .then((user) => {
            if (!user){
                return res.status(404).json({ alert: "Données introuvables !"});
            };
            if (user.id === userId) {
                if (!!req.body.password){
                    bcrypt.hash(req.body.password, 10)
                        .then((hashPassword) => {
                            user.update({
                                pseudonym: req.body.pseudonym,
                                image: req.body.image,
                                password: hashPassword,
                            })
                                .then((user) => {res.status(200).json({
                                    user: {
                                        userId: user.id,
                                        pseudonym: user.pseudonym,
                                        image: user.image,
                                        newUser: user.createdAt == user.updatedAt ? true : false,
                                        isAdmin: user.isAdmin
                                    },
                                    token: jwt.sign(
                                        {
                                            userId: user.id,
                                            registration: user.registration,
                                            isAdmin: user.isAdmin
                                        },
                                        process.env.TOKEN,
                                        {
                                            expiresIn: '12h'
                                        }
                                    ),
                                    message: "Profil modifié !" 
                                })})
                                .catch((error) => {res.status(400).json({ alert: "Impossible de mettre à jour votre profil !", error: error })})
                        })
                        .catch((error) => {res.status(500).json({ error: error, alert: "Problème serveur !" })})
                    ;
                } else {
                    user.update({
                        pseudonym: req.body.pseudonym,
                        image: req.body.image,
                    })
                        .then((user) => {res.status(200).json({
                            user: {
                                userId: user.id,
                                registration: user.registration,
                                pseudonym: user.pseudonym,
                                image: user.image,
                                newUser: user.createdAt === user.updatedAt ? true : false,
                                isAdmin: user.isAdmin
                            },
                            token: jwt.sign(
                                {
                                    userId: user.id,
                                    registration: user.registration,
                                    isAdmin: user.isAdmin
                                },
                                process.env.TOKEN,
                                {
                                    expiresIn: '12h'
                                }
                            ),
                            message: "Profil modifié !" 
                        })})
                        .catch((error) => {res.status(400).json({ alert: "Impossible de mettre à jour votre profil !", error: error })})
                    ;
                };
            } else { 
                return res.status(403).json({ alert: "Accès refusé ! Vous n'avez pas l'autorisation de modifier les informations de ce compte !", })
            };
        })
        .catch((error) => {
            res.status(404).json({
                error:  error,
                alert: "Utilisateur non trouvé !",
            });
        });
    ;
};

exports.getAllMessagesProfile = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    models.Message.findAll({
        order: [["updatedAt", "DESC"]],
        attributes: 
            [
                "id",
                "idUsers",
                "title",
                "content",
                "image",
                "createdAt",
                "updatedAt"
            ],
        where: {
            idUsers:  req.params.id
        },
        raw: true
    })
        .then((result) => {
            if (!result){
                return res.status(404).json({ error: error, alert: "Utilisateur introuvable !"});
            };
            res.status(200).json(result);
        })
        .catch((error) => { res.status(500).json({ error: error, alert: "Problème serveur !"}); })
    ;
};