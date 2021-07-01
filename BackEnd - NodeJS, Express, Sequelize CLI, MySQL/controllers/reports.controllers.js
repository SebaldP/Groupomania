const nekot = require("../utils/nekot");

const models = require("../models");

exports.getAllReport = (req, res, next) => {
    models.Report.findAll({
        order: [["updatedAt", "DESC"]],
        attributes: [
            "id",
            "idUsers",
            "idMessages",
            "idComments",
            "report",
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
        .then((reports) => { res.status(200).json(reports); })
        .catch((error) => { res.status(400).json({ error: error, alert: "Signalements introuvables !"}); })
    ;
};

exports.createReport = (req, res, next) => {
    if (req.body.report === "") {
        return res.status(400).json({ alert: "Merci de remplir tous les champs." });
    };
    const userId = nekot.userId(req);
    let idMessageValue = "";
    let idCommentValue = "";
    if (req.body.idComments){
        idCommentValue += req.body.idComments;
    };
    if (req.body.idMessages){
        idMessageValue += req.body.idMessages;
    };
    models.Report.create({
        idUsers: userId,
        idMessages: idMessageValue,
        idComments: idCommentValue,
        report: req.body.report,
    })
        .then(() => res.status(201).json({ message: "Signalement enregistré !" }))
        .catch((error) => res.status(400).json({ error: error, alert: "Création de signalement indisponible !" }))
    ;
};


exports.deleteReport = (req, res, next) => {
    models.Report.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((report) => {
            report.destroy()
                .then(() => { res.status(200).json({ message: "Signalement supprimé !", }); })
                .catch((error) => { res.status(400).json({
                    alert: "Le signalement n'a pas pu être supprimé !",
                    error: error
                });})
            ;
        })
        .catch((error) => { res.status(400).json({ alert: "Signalement introuvable !", error: error, }); })
};