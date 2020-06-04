var express = require("express");
var router = express.Router();
var fetch = require('node-fetch')

const GoogleKey = "AIzaSyCDa_5CfpTTBeNY0PFremSA5i_1zqaGnEU"

router.get('/',async function (req, res) {
    let address=req.query.address;
    console.log(address)

    function getData() {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GoogleKey}`)
    }

    const processData = async () => {
        const dataGetter = await getData()
        const responseData = await dataGetter.json()
        let data = (responseData.results[0].geometry.location)
        res.send(data)
    }

    if (address === undefined){
        res.send(404);
    }else{
        await processData()
        res.end
    }

})

module.exports = router
