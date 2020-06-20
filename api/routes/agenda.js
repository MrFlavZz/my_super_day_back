var express = require('express');
var router = express.Router();
const db = require("../models/index");
const {authJwt} = require('../middleware/index');
const Agenda = db.agenda;

/* GET home page. */
router.post('/addEvent', [authJwt.verifyToken], function (req, res, next) {
    console.log(req.body.start)
    Agenda.create({
        id_users: req.body.id_users,
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
    }).then((event) => {
        res.send({
            id: event.dataValues.id
        })
    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })
});

router.post('/getAllEvent', [authJwt.verifyToken], function (req, res, next) {
    Agenda.findAll({
        where: {
            id_users: req.body.id_users
        }
    }).then((event) => {
        let result = []
        let i = 0;
        for (const elem of event) {

            result.push({
                title: elem.dataValues.title,
                start: elem.dataValues.start,
                id: elem.dataValues.id,
                id_users: elem.dataValues.id_users,
                end: elem.dataValues.end,
                pos: i,
            })
            i++
        }
        res.send(result);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })
});

router.post('/deleteEvent', [authJwt.verifyToken], function (req, res, next) {
    Agenda.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.send({
            ok: true,
        })
    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })
});
router.post('/updateEvent', [authJwt.verifyToken], function (req, res, next) {
    Agenda.update(
        {
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
        }, {
            where: {
                id: req.body.id
            }
        })
        .then(() => {
        res.send({
            ok: true,
        })
    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })
});


module.exports = router;
