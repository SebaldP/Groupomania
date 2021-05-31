require('dotenv').config();                         // importation du package "dotenv"

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const models = require("../models");


exports.loginUser = (req, res, next) => {
    const regValue = req.body.registration;
    const firstCharacterRegistration = regValue.charAt(0);
    const leftStringRegistration = regValue.substring(1);
    const hashedRegValue = `${firstCharacterRegistration}${md5(leftStringRegistration)}`;
    User.findOne({where: { registration: hashedRegValue, },})
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
                user: {
                    userId: user.id,
                    pseudonym: user.pseudonym,
                    image: user.image,
                    newUser: user.createdAt === user.updatedAt ? true : false,
                    isAdmin: user.isAdmin
                },
                token: jwt.sign(
                    {
                        userId: user.id,
                        isAdmin: user.isAdmin
                    },
                    process.env.TOKEN,
                    {
                        expiresIn: '12h'
                    }
                ),
            });
        })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.resetPasswordUser = (req, res, next) => {
    const firstCharacterKey = req.body.key.charAt(0);
    const leftStringKey = req.body.key.substring(1);
    const hashKeyvalue = `${firstCharacterKey}${md5(leftStringKey)}`;
    const regValue = req.body.registration;
    const firstCharacterRegistration = regValue.charAt(0);
    const leftStringRegistration = regValue.substring(1);
    const hashedRegValue = `${firstCharacterRegistration}${md5(leftStringRegistration)}`;
    models.User.findOne({where: { registration: hashedRegValue, resetKey: hashKeyvalue },})
        .then((user) => {
            const firstVersion = user.oldPassword;
            user.update({
                password: firstVersion,
            })
                .then(() => res.status(200).json({ message: "Mot de passe réinitialisé !" }))
                .catch((error) => res.status(400).json({ error: "Impossible de réinitialiser votre mot de passe ! Nous vous prions de contacter l'administrateur ! " + error }))
            ;
        })
        .catch((error) => {
            res.status(404).json({
                error: error,
                message: "Utilisateur non trouvé !",
            });
        })
    ;
};