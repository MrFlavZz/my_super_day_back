var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')
const db = require("../models/index");
const {authJwt} = require('../middleware/index');
const Horoscope=db.horoscope;
const moment = require('moment')


router.get('/getAllType', async function (req, res) {

    var today = moment().format('DD/MM/YYYY')
    console.log(today)
    Horoscope.findOne({
        where:{
            date : today,
        }
    }).then(async (horoscope) => {

        if(horoscope==null){
            const signe =["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius"];

            const result = await getData()

            async function getData() {
                let result =[]
                for (const elem of signe){
                    await fetch(`http://horoscope-api.herokuapp.com/horoscope/today/${elem}`).then((res)=>{
                        return res.json()
                    }).then((data)=>{
                        result.push(data)
                    })

                }
                return result
            }
            console.log(result)
            Horoscope.create({
                aries:result[0].horoscope,
                taurus: result[1].horoscope,
                gemini: result[2].horoscope,
                cancer: result[3].horoscope,
                leo: result[4].horoscope,
                virgo: result[5].horoscope,
                libra: result[6].horoscope,
                scorpio:result[7].horoscope,
                sagittarius: result[8].horoscope,
                date: today,
            })


            res.send({
                result
            });
        }
        else {
            res.send({
                horoscope : horoscope.dataValues
            })
        }
    }).catch((e) => {
        console.log(e)
        res.status(500).send({message: "Erreur interne du serveur"})
    })





})

module.exports = router
