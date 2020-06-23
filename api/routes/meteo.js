var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')
const db = require("../models/index");
const Weather = db.meteo;
const meteoKey = process.env.METEO_KEY;
const {authJwt} = require('../middleware/index');
const googleKey = process.env.GOOGLE_KEY;

router.post('/getParticularTown', [authJwt.verifyToken], async function (req, res) {

    let address = req.body.address;
    let lat = ""
    let lng = ""



    async function getDataPos() {

        const dataGetter = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`).catch((e) => {
            console.log(e)
            res.status(500).send({message: "Erreur interne du serveur"})
        })
        const responseData = await dataGetter.json()
        let data = {
            latitude: responseData.results[0].geometry.location.lat,

            longitude: responseData.results[0].geometry.location.lng
        };
        return data
    }



    async function getData() {

        let data = await getDataPos()

        lat = data.latitude;
        lng = data.longitude;

        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&&appid=${meteoKey}`).then((res)=>{
            return res.json()
        }).catch((e) => {
            res.status(500).send({message: "Erreur interne du serveur"})
        })
    }

    const processData = async () => {

        const responseData = await getData()


        let data = {

        };

        data.daily = [];
        for (let i = 0; i < 7; i++) {
            data.daily.push({
                temperature: responseData.daily[i].temp,
                temperatureFeels: responseData.daily[i].feels_like,
                humidity: responseData.daily[i].humidity,
                cloud: responseData.daily[i].clouds,
                uv: responseData.daily[i].uvi,
                windSpeed: responseData.daily[i].wind_speed,
                weather: {
                    main: responseData.daily[i].weather[0].main,
                    description: responseData.daily[i].weather[0].description,
                    icon:responseData.daily[i].weather[0].icon,
                }

            });


        }
        console.log(data)
         res.json(data)
    }

    if (address === undefined) {
        res.send(404);
    } else {
         processData()
        res.end
    }

})


router.post('/getAllTown', [authJwt.verifyToken], function (req, res, next) {
    Weather.findAll({
        where: {
            id_users: req.body.id_user
        }
    }).then((users) => {

        let result = []
        for (const elem of users) {
            result.push({
                name:elem.dataValues.address,
                id: elem.dataValues.id,
            })
        }
        res.send(result);


    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })
});

router.post('/deleteTown', [authJwt.verifyToken], function (req, res, next) {
    Weather.destroy({
        where: {
            id: req.body.id
        }
    }).then((users) => {
        res.send({
            message:"Ville supprimée"
        })

    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })
});



router.post('/addTown', [authJwt.verifyToken], function (req, res, next) {

    Weather.create({
        address:  req.body.address,
        id_users: req.body.id_user,
    }).then((data) => {
        res.send({
            id:data.dataValues.id,
            message: "Nouvelle note enregistrée"
        })
    })

        .catch(err => {
            console.log(err)
            res.status(500).send({message: "Erreur interne du serveur"})

        });
});


module.exports = router