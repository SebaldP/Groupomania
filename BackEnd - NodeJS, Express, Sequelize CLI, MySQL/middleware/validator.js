module.exports = {
    loginUser: (req, res, next) => {
        const Registration_REGEX = /^G\d{3}[A-Z]{2}\d{3}\D{1}$/; //ex: G051AD286f [G(roupomania)051(site)AD(initial)286(num)f(monthbirth)]
        const Passkey_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#%&*€¤])(?!.*[{}[\]()\/\'"`~,;:.<>\s])(?=.{8,})/; //ex: Covid2021! (ou) 100%dePlaisir
        if (req.body.registration == null || req.body.password == null) {
            return res.status(400).json({ error: "Merci de remplir tous les champs !" });
        };
        if (!Registration_REGEX.test(req.body.registration)) {
            return res.status(400).json({ error: "Numéro de matricule incorrect !" });
        };
        if (!Passkey_REGEX.test(req.body.password)) {
            return res.status(401).json({ error: "Minimum (8 caractères): 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (!?@#%&*€¤)" });
        };
        next();
    },
    resetPassword: (req, res, next) => {
        const Registration_REGEX = /^G\d{3}[A-Z]{2}\d{3}\D{1}$/; //ex: G051AD286f [G(roupomania)051(site)AD(initial)286(num)f(monthbirth)]
        const Passkey_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#%&*€¤])(?!.*[{}[\]()\/\'"`~,;:.<>\s])(?=.{8,})/; //ex: Covid2021! (ou) 100%dePlaisir
        if (req.body.registration == null || req.body.key == null) {
            return res.status(400).json({ error: "Merci de remplir tous les champs !" });
        };
        if (!Registration_REGEX.test(req.body.registration)) {
            return res.status(400).json({ error: "Numéro de matricule incorrect !" });
        };
        if (!Passkey_REGEX.test(req.body.key)) {
            return res.status(401).json({ error: "Minimum (8 caractères): 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (!?@#%&*€¤)" });
        };
        next();
    },
    createUser: (req, res, next) => {
        const Registration_REGEX = /^G\d{3}[A-Z]{2}\d{3}\D{1}$/; //ex: G051AD286f [G(roupomania)051(site)AD(initial)286(num)f(monthbirth)]
        const Passkey_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#%&*€¤])(?!.*[{}[\]()\/\'"`~,;:.<>\s])(?=.{8,})/; //ex: Covid2021! (ou) 100%dePlaisir
        if (req.body.registration == null || req.body.password == null || req.body.key == null) {
            return res.status(400).json({ error: "Merci de remplir tous les champs !" });
        };
        if (!Registration_REGEX.test(req.body.registration)) {
            return res.status(400).json({ error: "Numéro de matricule incorrect !" });
        };
        if (!Passkey_REGEX.test(req.body.password)) {
            return res.status(401).json({ error: "Minimum (8 caractères): 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (!?@#%&*€¤)" });
        };
        if (!Passkey_REGEX.test(req.body.key)) {
            return res.status(401).json({ error: "Minimum (8 caractères): 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (!?@#%&*€¤)" });
        };
        next();
    },
    updateProfile: (req, res, next) => {
        const Text_REGEX_A = /(\%27)|(\')|(\-\-)|(\%23)|(#)/i;
        const Text_REGEX_B = /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i;
        const Text_REGEX_C = /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i;
        const Passkey_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#%&*€¤])(?!.*[{}[\]()\/\'"`~,;:.<>\s])(?=.{8,})/; //ex: Covid2021! (ou) 100%dePlaisir
        if (!Passkey_REGEX.test(req.body.password)) {
            return res.status(401).json({ error: "Minimum (8 caractères): 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (!?@#%&*€¤)" });
        };
        if (Text_REGEX_A.test(req.body.pseudonym)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Premier avertissement !" });
        };
        if (Text_REGEX_B.test(req.body.pseudonym)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Deuxième avertissement !" });
        };
        if (Text_REGEX_C.test(req.body.pseudonym)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Dernier avertissement !" });
        };
        next();
    },
    createAndUpdateMessage: (req, res, next) => {
        const Text_REGEX_A = /(\%27)|(\')|(\-\-)|(\%23)|(#)/i;
        const Text_REGEX_B = /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i;
        const Text_REGEX_C = /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i;
        if (req.body.title == null || req.body.content == null) {
            return res.status(400).json({ error: "Merci de remplir tous les champs !" });
        };
        if (Text_REGEX_A.test(req.body.content) || Text_REGEX_A.test(req.body.title)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Premier avertissement !" });
        };
        if (Text_REGEX_B.test(req.body.content) || Text_REGEX_B.test(req.body.title)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Deuxième avertissement !" });
        };
        if (Text_REGEX_C.test(req.body.content) || Text_REGEX_C.test(req.body.title)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Dernier avertissement !" });
        };
        next();
    },
    createAndUpdateComment: (req, res, next) => {
        const Text_REGEX_A = /(\%27)|(\')|(\-\-)|(\%23)|(#)/i;
        const Text_REGEX_B = /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i;
        const Text_REGEX_C = /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i;
        if (req.body.comment == null) {
            return res.status(400).json({ error: "Merci de remplir tous les champs !" });
        };
        if (Text_REGEX_A.test(req.body.comment)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Premier avertissement !" });
        };
        if (Text_REGEX_B.test(req.body.comment)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Deuxième avertissement !" });
        };
        if (Text_REGEX_C.test(req.body.comment)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Dernier avertissement !" });
        };
        next();
    },
    createReport: (req, res, next) => {
        const Text_REGEX_A = /(\%27)|(\')|(\-\-)|(\%23)|(#)/i;
        const Text_REGEX_B = /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i;
        const Text_REGEX_C = /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i;
        if (req.body.report == null) {
            return res.status(400).json({ error: "Merci de remplir tous les champs !" });
        };
        if (Text_REGEX_A.test(req.body.report)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Premier avertissement !" });
        };
        if (Text_REGEX_B.test(req.body.report)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Deuxième avertissement !" });
        };
        if (Text_REGEX_C.test(req.body.report)) {
            return res.status(401).json({ error: "Pas d'injection SQL dans l'entreprise ! Dernier avertissement !" });
        };
        next();
    },
}