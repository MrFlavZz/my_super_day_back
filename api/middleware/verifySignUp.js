const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {

    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Error - username indisponible"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Error - email indisponible"
                });
                return;
            }

            next();
        });
    });
};


const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;