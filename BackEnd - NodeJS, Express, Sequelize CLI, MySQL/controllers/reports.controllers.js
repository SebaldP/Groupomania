const nekot = require("../utils/nekot");

const models = require("../models");

exports.getAllReports = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    models.Report.findAll({
        order: [["updatedAt", "DESC"]],
        include: 
        [
            {
                model: models.User,
                attributes: ["pseudonym"]
            },
        ]
    })
        .then((result) => {
            if (!result){
                return res.status(404).json({ alert: "Signalements introuvables !"});
            };
            res.status(200).json(result);
        })
        .catch((error) => { res.status(500).json({ error: error, alert: "Problème serveur !"}); })
    ;
};

exports.createReport = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
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
        .then((result) => {res.status(201).json({ result: result, message: "Signalement enregistré !" })})
        .catch((error) => {res.status(400).json({ error: error, alert: "Création de signalement indisponible !" })})
    ;
};


exports.deleteReport = (req, res, next) => {
    console.log(req.headers);
console.log(req.body);
    models.Report.finmodelsyPk(req.params.id)
        .then((report) => {
            if (!report){
                return res.status(404).json({ alert: "Données introuvables !"});
            };
            report.destroy()
                .then((result) => { res.status(200).json({ result: result, message: "Signalement supprimé !", }); })
                .catch((error) => { res.status(400).json({
                    alert: "Le signalement n'a pas pu être supprimé !",
                    error: error
                });})
            ;
        })
        .catch((error) => { res.status(400).json({ alert: "Signalement introuvable !", error: error, }); })
};