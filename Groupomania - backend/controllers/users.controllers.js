const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const models = require("../models");

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/;

exports.createUser = (req, res, next) => {
    if (req.body.email == null || req.body.pseudonym == null || req.body.password == null) {
        return res.status(400).json({ error: "Merci de remplir tous les champs !" });
    }
    if (!EMAIL_REGEX.test(req.body.email)) {
        return res.status(400).json({ error: "Email incorrect !" });
    }
    if (!PASSWORD_REGEX.test(req.body.password)) {
        return res.status(401).json({ error: "Minimum: 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère (!.@#$%^&*)" });
    }
    const firstCharacter = req.body.email.split("@")[0].charAt(0);
    const firstString = req.body.email.split("@")[0].substring(1);
    const lastString = req.body.email.split("@")[1];
    const hashEmailvalue = `${firstCharacter}${md5(firstString)}@${lastString}`; 
    bcrypt.hash(req.body.password, 10)
    .then(hashPassword => {
        const user = models.User.create({
            pseudonym: req.body.name,
            email: hashEmailvalue,
            password: hashPassword,
            isAdmin: false,
        })
        .then((user) => {
            res.status(201).json({
                userId: user.id,
                isAdmin: user.isAdmin,
            });
        })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
};

exports.loginUser = (req, res, next) => {
    if (req.body.email == null || req.body.password == null) {
        return res.status(400).json({ error: "Merci de remplir tous les champs !" });
    }
    if (!EMAIL_REGEX.test(req.body.email)) {
        return res.status(400).json({ error: "Email incorrect !" });
    }
    if (!PASSWORD_REGEX.test(req.body.password)) {
        return res.status(401).json({ error: "Minimum: 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère (!.@#$%^&*)" });
    }
    const firstCharacter = req.body.email.split("@")[0].charAt(0);
    const firstString = req.body.email.split("@")[0].substring(1);
    const lastString = req.body.email.split("@")[1];
    const hashEmailvalue = `${firstCharacter}${md5(firstString)}@${lastString}`;
    User.findOne({where: { email: hashEmailvalue, },})
    .then(user => {
        if (!user){
            return res.status(401).json({ error: "Compte introuvable! "});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(404).json({ error: "Mode de passe incorrect! "});
            }
            res.status(200).json({
                userId: user._id,
                pseudonym: user.pseudonym,
                token: jwt.sign(
                    {
                        userId: user._id,
                        isAdmin: user.isAdmin
                    },
                    process.env.TOKEN,
                    {
                        expiresIn: '24h'
                    }
                    )
                });
            })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};