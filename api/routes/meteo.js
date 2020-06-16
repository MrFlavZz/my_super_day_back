var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')

const meteoKey = process.env.METEO_KEY;

router.get('/',async function (req, res) {

    let address=req.query.address;
    let lat = ""
    let lng = ""

    async function getData() {




        const getter = await fetch(`http://localhost:9000/mysuperday/api/trajet/coordinate?address=${address}`)
        const response = await getter.json()

        lat = response.latitude;
        lng=response.longitude;
        console.log((lat))

        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&&appid=${meteoKey}`)
    }

    const processData = async () => {
        const dataGetter = await getData()
        const responseData = await dataGetter.json()


        let data = {
            current: {
                temperature: responseData.current.temp,
                temperatureFeels : responseData.current.feels_like,
                humidity:responseData.current.humidity,
                cloud:responseData.current.clouds,
                uv:responseData.current.uvi,
                windSpeed:responseData.current.wind_speed,
                weather:
                    {
                        main:responseData.current.weather[0].main,
                        description: responseData.current.weather[0].description,
                    }

            },
        };

        data.daily = [];
        for(let i =0;i<responseData.daily.length; i++){
            data.daily.push({
                temperature:responseData.daily[i].temp,
                temperatureFeels:responseData.daily[i].feels_like,
                humidity:responseData.daily[i].humidity,
                cloud:responseData.daily[i].clouds,
                uv:responseData.daily[i].uvi,
                windSpeed:responseData.daily[i].wind_speed,
                weather: {
                        main:responseData.daily[i].weather[0].main,
                        description: responseData.daily[i].weather[0].description,
                    }

            });




        }

        await res.json(data)
    }

    if (address === undefined){
        res.send(404);
    }else{
        await processData()
        res.end
    }

})

module.exports = router