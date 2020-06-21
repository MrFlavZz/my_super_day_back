var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')
const db = require("../models/index");
const {authJwt} = require('../middleware/index');
const Horoscope = db.horoscope;
const moment = require('moment')
const {Translate} = require('@google-cloud/translate').v2;

router.post('/getAllType', [authJwt.verifyToken], async function (req, res) {

    var today = moment().format('DD/MM/YYYY')
    const translate = new Translate();

    function getTranslate(signe) {
        switch (signe) {
            case 'aries':
                return "Bélier"
            case 'taurus':
                return "Taureau";
            case 'gemini':
                return "Gémeaux";
            case'cancer':
                return "Cancer";
            case 'leo':
                return "Lion";
            case 'virgo':
                return "Vierge";
            case'libra':
                return "Balance";
            case'scorpio':
                return "Scorpion";
            case 'sagittarius':
                return "Sagittaire";
            case 'aquarius':
                return "Verseau";
            case 'pisces':
                return "Poisson";
            case 'capricorn':
                return "Capricorne";
            default:
                return "Erreur";

        }


    }


    async function tradHoroscope(text) {
        let traduction = ''
        let [translations] = await translate.translate(text, "fr");

        translations = Array.isArray(translations) ? translations : [translations];
        translations.forEach((translation, i) => {
            traduction = translation
        });


        return traduction;
    }

    Horoscope.findOne({
        where: {
            date: today,
        }
    }).then(async (horoscope) => {
        if (horoscope == null) {
            const signe = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "aquarius", "pisces", 'capricorn'];

            const result = await getData()

            async function getData() {
                let result = []
                for (const elem of signe) {
                    await  fetch(`http://horoscope-api.herokuapp.com/horoscope/today/${elem}`).then((res) => {
                        return res.json()
                    }).then(async (data) => {

                        result.push({
                            horoscope: await tradHoroscope(data.horoscope),
                            sunsign: getTranslate(data.sunsign),
                        })
                    })

                }


                return result
            }

            Horoscope.update({
                    aries: result[0].horoscope,
                    taurus: result[1].horoscope,
                    gemini: result[2].horoscope,
                    cancer: result[3].horoscope,
                    leo: result[4].horoscope,
                    virgo: result[5].horoscope,
                    libra: result[6].horoscope,
                    scorpio: result[7].horoscope,
                    sagittarius: result[8].horoscope,
                    aquarius: result[9].horoscope,
                    pisces: result[10].horoscope,
                    capricorn: result[11].horoscope,
                    date: today,
                }, {
                    where: {
                        id: 4
                    },
                }
            ).catch((e) => {
                console.log(e)
                res.status(500).send({message: "Erreur interne du serveur"})
            })


            res.send(
                result
            );
        } else {
            const result = [
                {
                    sunsign: "Bélier",
                    horoscope: horoscope.dataValues.aries
                },
                {
                    sunsign: "Taureau",
                    horoscope: horoscope.dataValues.taurus
                },
                {
                    sunsign: "Gémeaux",
                    horoscope: horoscope.dataValues.gemini
                },
                {
                    sunsign: "Lion",
                    horoscope: horoscope.dataValues.leo
                },
                {
                    sunsign: "Vierge",
                    horoscope: horoscope.dataValues.virgo
                },
                {
                    sunsign: "Balance",
                    horoscope: horoscope.dataValues.libra
                },
                {
                    sunsign: "Scorpion",
                    horoscope: horoscope.dataValues.scorpio
                },
                {
                    sunsign: "Sagittaire",
                    horoscope: horoscope.dataValues.sagittarius
                },
            ]


            res.send(result)
        }
    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })


})

module.exports = router
