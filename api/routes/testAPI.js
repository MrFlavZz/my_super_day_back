var express = require("express");
var router = express.Router();
var async = require('express-async-await')
var fetch = require('node-fetch')

const GoogleKey = "AIzaSyCDa_5CfpTTBeNY0PFremSA5i_1zqaGnEU"

router.get('/', async function (req, res, next) {
    function ooIfoundData() {
        res.header("Access-Control-Allow-Origin","*")
        var address = req.address
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GoogleKey}`)

    }

    const ooIprocessData = async () => {
        const github = await ooIfoundData()
        const ooiResponseData = await github.json()
        res.send(ooiResponseData)
    }
    ooIprocessData()
    res.end

})

module.exports = router
