var express = require('express');
var router = express.Router();
const {authJwt} = require('../middleware/index');
const db = require("../models/index");

const User = db.user;

/* GET home page. */
router.post('/getNumberDaySinceBirth', [authJwt.verifyToken], function (req, res, next) {

    User.findOne({
        where:{
            id: req.body.id_user
        }
    }).then((users)=>{




        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date();

        const secondDate = new Date(users.dataValues.birthDate);

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));


        res.send({
            resultat:diffDays,
        })

    }).catch((e)=>{

    })
});

module.exports = router;
