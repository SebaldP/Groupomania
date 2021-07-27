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
            "avatar",
            "isModerator"
        ],
        where: {
            isAdmin: false
        },
        include: 
        [
            {
                model: models.Message,
                attributes: ["updatedAt"]
            }
        ],
        order:[
            ['pseudonym', 'ASC']
        ]
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
            "avatar",
            "isModerator",
            "isAdmin",
            "createdAt",
            "updatedAt"
        ],
        where: {
            id: req.params.id
        }
    })
    .then((result) => {
        if (!result){
            return res.status(404).json({ alert: "Utilisat.eur.rice introuvable !"});
        };
        res.status(200).json(result);
    })
    .catch((error) => { res.status(500).json({ error: error, alert: "Problème serveur !"}); });
};

exports.modifyProfile = (req, res) => {
    console.log(req.headers);
console.log(req.body);
    const userId = nekot.userId(req);
    if (req.body.pseudonym == "" || req.body.avatar == "") {
        return res.status(400).json({ alert: "Merci de remplir tous les champs !" });
    }
    models.User.findOne({where: {id: req.params.id}})
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
                                avatar: req.body.avatar,
                                password: hashPassword,
                            })
                                .then((user) => {
                                    res.status(200).json({
                                        user: {
                                            userId: user.id,
                                            pseudonym: user.pseudonym,
                                            avatar: user.avatar,
                                            createdAt: user.createdAt,
                                            updatedAt: user.updatedAt,
                                            isAdmin: user.isAdmin,
                                            isModerator: user.isModerator
                                        },
                                        token: jwt.sign(
                                            {
                                                userId: user.id,
                                                isAdmin: user.isAdmin,
                                                isModerator: user.isModerator
                                            },
                                            process.env.TOKEN,
                                            {
                                                expiresIn: '12h'
                                            }
                                        ),
                                        message: "Profil et mot de passe modifiés !" 
                                    })
                                })
                                .catch((error) => {res.status(400).json({ alert: "Impossible de mettre à jour votre profil !", error: error })})
                        })
                        .catch((error) => {res.status(500).json({ error: error, alert: "Problème serveur !" })})
                    ;
                } else {
                    user.update({
                        pseudonym: req.body.pseudonym,
                        avatar: req.body.avatar,
                    })
                        .then(() => {res.status(200).json({message: "Profil modifié !"})})
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
                alert: "Utilisat.eur.rice non trouvé.e !",
            });
        });
    ;
};

exports.getAllMessagesProfile = (req, res, next) => {
    console.log(req.headers);
    console.log(req.body);
    models.Message.findAll({
        order: [["updatedAt", "DESC"]],
        where: {
            idUsers:  req.params.id
        }
    })
        .then((result) => {
            if (!result){
                return res.status(404).json({ error: error, alert: "Publications de l'utilisat.eur.rice introuvables !"});
            };
            res.status(200).json(result);
        })
        .catch((error) => { res.status(500).json({ error: error, alert: "Problème serveur !"}); })
    ;
};