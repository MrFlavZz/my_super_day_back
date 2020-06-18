var express = require('express');
var router = express.Router();
const {authJwt} = require('../middleware/index');
const db = require("../models/index");
const Var = db.variable
const Function = db.function;


/* GET home page. */
router.post('/getVariableFunction', [authJwt.verifyToken,], async function (req, res, next) {
    let result = {
        variables: [],
        functions: [],
    };
    await Var.findAll({
        where: {
            id_users: req.body.id_user
        }
    }).then(data => {

        for (const Element of data) {
            result.variables.push(Element.dataValues.variable)
        }


    }) .catch(err => {
        console.log(err)
        res.status(500).send({message: "Erreur interne du serveur"})

    });

    Function.findAll({
        where: {
            id_users: req.body.id_user
        }
    }).then(data => {

        for (const Element of data) {
            result.functions.push(Element.dataValues.function)
        }

        res.send(
            result
        )
    }) .catch(err => {
        console.log(err)
        res.status(500).send({message: "Erreur interne du serveur"})

    });



});


router.post('/addFunction', [authJwt.verifyToken,], async function (req, res, next) {

    Function.create({
        id_users: req.body.id_user,
        function: req.body.function,
    }).then(() => {
        res.send({
            message: "Nouvelle fonction enregistrée"
        })
    })

        .catch(err => {
            console.log(err)
            res.status(500).send({message: "Erreur interne du serveur"})

        });


});

router.post('/addVariable', [authJwt.verifyToken,], async function (req, res, next) {

    Var.create({
        id_users: req.body.id_user,
        variable: req.body.variable
    }).then(() => {
        res.send({
            message: "Nouvelle variable enregistrée"
        })
    })

        .catch(err => {
            console.log(err)
            res.status(500).send({message: "Erreur interne du serveur"})

        });


});

router.post('/deleteVariable', [authJwt.verifyToken,], async function (req, res, next) {

    Var.destroy({
        where: {
            id_users: req.body.id_user,
            variable: req.body.variable,
        }
    }).then(() => {
        res.send({
            message: "Variable supprimée"
        })
    })
        .catch(err => {
            console.log(err)
            res.status(500).send({message: "Erreur interne du serveur"})
        });
});

router.post('/deleteFunction', [authJwt.verifyToken,], async function (req, res, next) {

    Function.destroy({
        where: {
            id_users: req.body.id_user,
            function: req.body.variable,
        }
    }).then(() => {
        res.send({
            message: "Fonction supprimée"
        })
    })
        .catch(err => {
            console.log(err)
            res.status(500).send({message: "Erreur interne du serveur"})
        });
});


module.exports = router;
