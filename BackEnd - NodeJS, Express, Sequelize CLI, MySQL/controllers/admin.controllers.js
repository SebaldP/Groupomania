const bcrypt = require('bcrypt');
const md5 = require('md5');

const models = require("../models");

exports.createUser = (req, res, next) => {
    const hashedKeyvalue = `${req.body.key.charAt(0)}${md5(req.body.key.substring(1))}`;
    const hashedRegValue = `${req.body.registration.charAt(0)}${md5(req.body.registration.substring(1))}`;
    bcrypt.hash(req.body.password, 10)
        .then(hashPassword => {
            models.User.create({
                pseudonym: "Utilisateur " + Date.now(),
                registration: hashedRegValue,
                password: hashPassword,
                oldPassword: hashPassword,
                resetKey: hashedKeyvalue,
                image: "./images/groupomania_logo.png",
                isAdmin: false,
            })
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(400).json({ error: error }));
        })
        .catch((error) => res.status(500).json({ error: error }))
    ;
};

exports.deleteUser = (req, res, next) => {
    const userRegistration = req.params.registration;
    const hashedRegistration = `${userRegistration.charAt(0)}${md5(userRegistration.substring(1))}`;
    models.User.findOne({where: { registration: hashedRegistration, },})
        .then(user => {
            const userPseudonym = user.pseudonym;
            user.destroy()
                .then(() => res.status(200).json({ message: `L'utilisateur "${userPseudonym}" (${userRegistration}) a été définitivement supprimé, avec l'ensemble de son contenu !` }))
                .catch((error) => res.status(400).json({ error: error }));
        })
        .catch(error => res.status(500).json({ error }))
    ;
};