var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')


router.get('/',async function (req, res) {


    let action = req.query.action;


    function getData() {
        return fetch(`https://api.lecho.be/services/stocks?quotes=urn:issue:${action}`)
    }

    const processData = async () => {
        const dataGetter = await getData()
        const responseData = await dataGetter.json()
        let data = {
            name: responseData.results[0].fullNames.default,
            dayChangePercentage: responseData.results[0].dayChangePercentage,
            lastPrice: responseData.results[0].lastPrice,
            highPrice: responseData.results[0].highPrice,
            lowPrice: responseData.results[0].lowPrice,
            previousPrice:responseData.results[0].previousPrice,
            volume:responseData.results[0].volume,
        }
        await res.json(data);

    }
    if (action === undefined) {
        res.sendStatus(404);
    } else {
        await processData()
        res.end
    }
})

module.exports = router