var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')


router.get('/', async function (req, res) {
    let temps = req.query.temps;
    let signe = req.query.signe


    switch (signe) {
        case 'belier':
            signe = "aries";
            break;
        case 'taureau':
            signe = "taurus";
            break;
        case 'gemeaux':
            signe = "gemini";
            break;
        case'cancer':
            signe = "cancer";
            break;
        case 'lion':
            signe = "leo";
            break;
        case 'vierge':
            signe = "virgo";
            break;
        case'balance':
            signe = "libra";
            break;
        case'scorpion':
            signe = "scorpio";
            break;
        case 'sagittaire':
            signe = "Sagittarius";
            break;
        default:
            res.sendStatus(404);

    }

    function getData() {
        return fetch(`http://horoscope-api.herokuapp.com/horoscope/${temps}/${signe}`)
    }

    const processData = async () => {
        const dataGetter = await getData()
        const responseData = await dataGetter.json()
        let data = {
            horoscope:responseData.horoscope
        };
        await res.json(data)
    }

    if (signe === undefined && temps === undefined) {
        res.sendStatus(404);
    } else {
        await processData()
        res.end
    }

})

module.exports = router
