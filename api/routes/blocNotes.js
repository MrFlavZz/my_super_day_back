var express = require('express');
var router = express.Router();
const db = require("../models/index");
const NoteBlock = db.noteBlock
const {authJwt} = require('../middleware/index');


router.post('/getAllNotes', [authJwt.verifyToken], function (req, res, next) {
    NoteBlock.findAll({
        where: {
            id_users: req.body.id_user
        }
    }).then((users) => {
        let result = []
        for (const elem of users) {
            result.push({
                title: elem.dataValues.title,
                value: elem.dataValues.value,
                id: elem.dataValues.id,
            })
        }
        res.send(result);


    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })
});

router.post('/deleteNote', [authJwt.verifyToken], function (req, res, next) {
    NoteBlock.destroy({
        where: {
            id: req.body.id
        }
    }).then((users) => {
        res.send({
            message:"Note supprimée"
        })

    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })
});

router.post('/updateNote', [authJwt.verifyToken], function (req, res, next) {
    NoteBlock.update(
    {
        value:req.body.newValue,
    },{
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.send({
            message:"Note modifée"
        })

    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })
});

router.post('/addNote', [authJwt.verifyToken], function (req, res, next) {
    NoteBlock.create({
        title:  req.body.title,
        id_users: req.body.id_user,
        value:  req.body.value
    }).then((users) => {
        res.send({
            id:users.dataValues.id,
            message: "Nouvelle note enregistrée"
        })
    })

        .catch(err => {
            console.log(err)
            res.status(500).send({message: "Erreur interne du serveur"})

        });
});


module.exports = router;
