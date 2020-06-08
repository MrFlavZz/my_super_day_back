var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')

const meteoKey = process.env.METEO_KEY;

router.get('/',async function (req, res) {


    let lat = '50.7088633'
    let lng = '3.1801746'



    function getData() {
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&&appid=${meteoKey}
`)
    }

    const processData = async () => {
        const dataGetter = await getData()
        const responseData = await dataGetter.json()
        let data = {
            /*TODO : trier info */
        };
        await res.json(data)
    }

    if (lat === undefined || lng === undefined){
        res.send(404);
    }else{
        await processData()
        res.end
    }

})

module.exports = router