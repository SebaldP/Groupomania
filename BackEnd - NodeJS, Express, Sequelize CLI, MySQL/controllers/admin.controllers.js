const bcrypt = require('bcrypt');
const md5 = require('md5');

const models = require("../models");

exports.createUser = (req, res, next) => {
    console.log(req.headers);
    console.log(req.body);
    const hashedKeyvalue = `${req.body.key.charAt(0)}${md5(req.body.key.substring(1))}`;
    const hashedRegValue = `${req.body.registration.charAt(0)}${md5(req.body.registration.substring(1))}`;
    bcrypt.hash(req.body.password, 10)
        .then((hashPassword) => {
            models.User.create({
                pseudonym: "Utilisateur " + Date.now(),
                registration: hashedRegValue,
                password: hashPassword,
                oldPassword: hashPassword,
                resetKey: hashedKeyvalue,
                image: "./images/groupomania_logo.png",
                isAdmin: false,
            })
                .then((result) => {res.status(201).json({ message: "Utilisateur créé !", result: result })})
                .catch((error) => {res.status(400).json({ alert: "Création indisponible !", error: error })});
        })
        .catch((error) => {res.status(500).json({ error: error, alert: "Problème serveur !" })})
    ;
};

exports.deleteUser = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    const userRegistration = req.params.registration;
    const hashedRegistration = `${userRegistration.charAt(0)}${md5(userRegistration.substring(1))}`;
    models.User.findOne({where: { registration: hashedRegistration, },})
        .then((user) => {
            const userPseudonym = user.pseudonym;
            user.destroy()
                .then((result) => {res.status(200).json({ result: result, message: `L'utilisateur "${userPseudonym}" (${userRegistration}) a été définitivement supprimé, avec l'ensemble de son contenu !` })})
                .catch((error) => {res.status(400).json({ alert: `L'utilisateur "${userPseudonym}" (${userRegistration}) n'a pas pu être définitivement supprimé !`, error: error })});
        })
        .catch((error) => {res.status(500).json({ error: error, alert: "Problème serveur !" })})
    ;
};