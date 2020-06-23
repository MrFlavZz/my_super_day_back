var express = require('express');
var router = express.Router();
const {authJwt} = require('../middleware/index');
const db = require("../models/index");
var moment = require('moment');
const User = db.user;

/* GET home page. */
router.post('/getNumberDaySinceBirth', [authJwt.verifyToken], function (req, res, next) {

    User.findOne({
        where:{
            id: req.body.id_user
        }
    }).then((users)=>{





        const firstDate = moment().format("YYYYMMDD");

        const secondDate = moment(new Date(decodeURI( users.dataValues.birthDate))).format("YYYYMMDD")

        const diffDays =moment(firstDate).diff(moment(secondDate),'days')


        res.send({
            resultat:diffDays,
        })

    }).catch((e)=>{

    })
});

module.exports = router;
