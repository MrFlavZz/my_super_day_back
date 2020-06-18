var express = require('express');
var router = express.Router();
const db = require("../models/index");
const NoteBlock = db.noteBlock
const {authJwt} = require('../middleware/index');


router.post('/getAllNotes', [authJwt.verifyToken], function (req, res, next) {
    NoteBlock.findAll({
        where:{
            id_users: req.body.id_user
        }
    }).then((users)=>{
        let result=[]
        for (const elem of users){
            result.push({
                title:elem.dataValues.title,
                value:elem.dataValues.value,
            })
        }
        res.send(result);


    }).catch((e)=>{
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })
});






module.exports = router;
