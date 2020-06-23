var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')
const db = require("../models");
const User = db.user;
const {authJwt} = require('../middleware/index');
const Trajet = db.trajet;


const googleKey = process.env.GOOGLE_KEY;


router.post('/coordinate', [authJwt.verifyToken], async function (req, res) {
    let address = ''
    console.log(req.body.address)
    await Trajet.findOne({
        where: {
            title: req.body.address,
            id_users: req.body.id_user
        }
    }).then((answer) => {
        if (answer !== null) {
            address = answer.dataValues.value
        } else {
            address = req.body.address;
        }

    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })


    function getData() {

        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`).catch((e) => {
            res.status(500).send({message: "Erreur interne du serveur"})
        })
    }

    const processData = async () => {

        const dataGetter = await getData()
        const responseData = await dataGetter.json()

        let data = {
            latitude: responseData.results[0].geometry.location.lat,

            longitude: responseData.results[0].geometry.location.lng
        };
        await res.json(data)
    }

    if (address === undefined) {
        res.send(404);
    } else {
        await processData()
        res.end
    }

})

router.post('/infotrajet', [authJwt.verifyToken], async function (req, res) {
    let origin = '';
    let destination = '';



    await Trajet.findOne({
        where: {
            title: req.body.origin,
            id_users: req.body.id_user
        }
    }).then((answer) => {

        if (answer !== null) {
            origin = answer.dataValues.value
        } else {
            origin = req.body.origin;
        }

    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })


    await Trajet.findOne({
        where: {
            title:  req.body.destination,
            id_users: req.body.id_user
        }
    }).then((answer) => {

        if (answer !== null) {
            destination = answer.dataValues.value
        } else {
            destination = req.body.destination;
        }
    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })




    function getData() {
        console.log(origin)
        return fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${ origin}&destinations=${destination}&key=${googleKey}`).catch((e) => {
            res.status(500).send({message: "Erreur interne du serveur"})
        })
    }

    const processData = async () => {
        const dataGetter = await getData()
        const responseData = await dataGetter.json()



        if(responseData.rows[0].elements[0].distance===undefined){
            await res.sendStatus(409)
        }
        else {
            let data = {
                origin: responseData.origin_addresses[0],
                destination: responseData.destination_addresses[0],

                itinerary: {
                    distance: {
                        value: responseData.rows[0].elements[0].distance.value,
                        text: responseData.rows[0].elements[0].distance.text,

                    },
                    duration: {
                        value: responseData.rows[0].elements[0].duration.value,
                        text: responseData.rows[0].elements[0].duration.text,

                    },
                },
            };
            await res.json(data)
        }



    }
    if (origin === undefined || destination === undefined) {
        res.status(404);
    } else {
        await processData()
        res.end
    }

})

router.post('/addFav', [authJwt.verifyToken], function (req, res, next) {

    Trajet.create({
        title: encodeURI(req.body.title),
        id_users: req.body.id_user,
        value: encodeURI(req.body.value),
    }).then((users) => {
        res.send({
            id: users.dataValues.id,
            message: "Favori ajouté"
        })
    })

        .catch(err => {
            console.log(err)
            res.status(500).send({message: "Erreur interne du serveur"})

        });
});

router.post('/getFav', [authJwt.verifyToken], function (req, res, next) {

    Trajet.findAll({
        where: {
            id_users: req.body.id_users
        }
    }).then((traj) => {
        let result = []
        for (const elem of traj) {
            result.push({
                title: decodeURI( elem.dataValues.title),
            })
        }
        res.send(result);

    })
        .catch(err => {
            console.log(err)
            res.status(500).send({message: "Erreur interne du serveur"})

        });
});

module.exports = router
