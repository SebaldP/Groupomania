require('dotenv').config();                         // importation du package "dotenv"

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const models = require("../models");


exports.loginUser = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    const regValue = req.body.registration;
    const firstCharacterRegistration = regValue.charAt(0);
    const leftStringRegistration = regValue.substring(1);
    const hashedRegValue = `${firstCharacterRegistration}${md5(leftStringRegistration)}`;
    models.User.findOne({where: { registration: hashedRegValue, },})
    .then((user) => {
        if (!user){
            return res.status(404).json({ alert: "Compte introuvable! "});
        }
        let newUserValue = user.createdAt === user.updatedAt ? true : false;
        bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
            if (!valid) {
                return res.status(404).json({ alert: "Mode de passe incorrect! "});
            }
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
                message: "Connection réussite !"
            });
        })
        .catch((error) => {res.status(500).json({ error: error, alert: "Problème serveur !" })});
    })
    .catch((error) => {res.status(500).json({ error: error, alert: "Problème serveur !" })});
};

exports.resetPasswordUser = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    const firstCharacterKey = req.body.key.charAt(0);
    const leftStringKey = req.body.key.substring(1);
    const hashKeyvalue = `${firstCharacterKey}${md5(leftStringKey)}`;
    const regValue = req.body.registration;
    const firstCharacterRegistration = regValue.charAt(0);
    const leftStringRegistration = regValue.substring(1);
    const hashedRegValue = `${firstCharacterRegistration}${md5(leftStringRegistration)}`;
    models.User.findOne({where: { registration: hashedRegValue, resetKey: hashKeyvalue },})
        .then((user) => {
            if (!user){
                return res.status(404).json({ alert: "Données introuvables !"});
            };
            const firstVersion = user.oldPassword;
            user.update({
                password: firstVersion,
            })
                .then((result) => {res.status(200).json({result: result, message: "Mot de passe réinitialisé !" })})
                .catch((error) => {res.status(400).json({ alert: "Impossible de réinitialiser votre mot de passe ! Nous vous prions de contacter l'administrat.eur.rice !", error: error})})
            ;
        })
        .catch((error) => {
            res.status(404).json({
                error: error,
                alert: "Utilisat.eur.rice introuvable !",
            });
        })
    ;
};