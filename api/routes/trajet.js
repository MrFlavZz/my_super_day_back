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
    console.log(decodeURI(req.body.address))
    if (decodeURI(req.body.address) ==="Mon domicile") {
        console.log(req.body.address)
       await User.findOne({
            where: {
                id: req.body.id_user
            }
        }).then((answer) => {
            console.log(answer)
            address = answer.dataValues.homeAddress;
        }).catch((e) => {
            console.log(e)
            res.status(500).send({message: "Erreur interne du serveur"})
        })
    }
    else {
        address = req.body.address
    }




    function getData() {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`)
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
    let origin = req.body.origin;
    let destination = req.body.destination;
    if (decodeURI(origin) ==="Mon domicile") {
        await User.findOne({
            where: {
                id: req.body.id_user
            }
        }).then((answer) => {
            console.log(answer)
            origin = answer.dataValues.homeAddress;
        }).catch((e) => {
            console.log(e)
            res.status(500).send({message: "Erreur interne du serveur"})
        })
    }

    if (decodeURI(destination) ==="Mon domicile") {
        await User.findOne({
            where: {
                id: req.body.id_user
            }
        }).then((answer) => {
            console.log(answer)
            destination = answer.dataValues.homeAddress;
        }).catch((e) => {
            console.log(e)
            res.status(500).send({message: "Erreur interne du serveur"})
        })
    }






    function getData() {
        return fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${googleKey}`)
    }

    const processData = async () => {
        const dataGetter = await getData()
        const responseData = await dataGetter.json()
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
    if (origin === undefined || destination === undefined) {
        res.status(404);
    } else {
        await processData()
        res.end
    }

})

router.post('/addFav', [authJwt.verifyToken], function (req, res, next) {

    Trajet.create({
        title:  req.body.title,
        id_users: req.body.id_user,
        value:  req.body.value
    }).then((users) => {
        res.send({
            id:users.dataValues.id,
            message: "Favori ajouté"
        })
    })

        .catch(err => {
            console.log(err)
            res.status(500).send({message: "Erreur interne du serveur"})

        });
});

module.exports = router
