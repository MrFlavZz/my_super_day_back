var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')

const googleKey = process.env.GOOGLE_KEY;


router.get('/coordinate',async function (req, res) {
    let address=req.query.address;
    console.log(address)

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

    if (address === undefined){
        res.send(404);
    }else{
        await processData()
        res.end
    }

})

router.get('/infotrajet',async function (req, res) {
    let origin=req.query.origin;
    let destination=req.query.destination;


    function getData() {
        return fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${googleKey}`)
    }

    const processData = async () => {
        const dataGetter = await getData()
        const responseData = await dataGetter.json()
        let data = {
            origin:responseData.origin_addresses[0],
            destination:responseData.destination_addresses[0],

            itinerary:{
                distance:{
                    value:responseData.rows[0].elements[0].distance.value,
                    text:responseData.rows[0].elements[0].distance.text,

                },
                duration:{
                    value:responseData.rows[0].elements[0].duration.value,
                    text:responseData.rows[0].elements[0].duration.text,

                },
            },
        };
        await res.json(data)
    }
    if (origin === undefined || destination === undefined){
        res.status(404);
    }else{
        await processData()
        res.end
    }

})
module.exports = router
