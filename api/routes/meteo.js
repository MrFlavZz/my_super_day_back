var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')

const meteoKey = process.env.METEO_KEY;

router.post('/getParticularTown', async function (req, res) {

    let address = req.body.address;
    let lat = ""
    let lng = ""

    async function getData() {


        const getter = await fetch(encodeURI(`https://bdoalex.com/mysuperday/api/trajet/coordinate?address=${address}`))

        const response = await getter.json()

        lat = response.latitude;
        lng = response.longitude;

        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&&appid=${meteoKey}`)
    }

    const processData = async () => {
        const dataGetter = await getData()
        const responseData = await dataGetter.json()


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

        await res.json(data)
    }

    if (address === undefined) {
        res.send(404);
    } else {
        await processData()
        res.end
    }

})

module.exports = router