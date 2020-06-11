var express = require('express');
var router = express.Router();

const {verifySignUp} = require('../middleware/index');
const controller = require('../controllers/aut.controller');
var fetch = require('node-fetch')
const googleKey = process.env.GOOGLE_KEY;
router.post('/signup',  [
        verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup


);

router.post('/signin', controller.signin

);


router.post('/getAutocomplete' ,async function (req, res) {
    let address = req.body.address;

    function getData() {
        return fetch(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?&key=${googleKey}&input=${address}`)
    }

    const processData = async () => {
        const dataGetter = await getData()
        const responseData = await dataGetter.json()
        let data = {
            predictions : []
        }
        for (let i = 0 ; i<responseData.predictions.length;i++){
            data.predictions.push(responseData.predictions[i].description)
        }
        await res.json(data)
    }

    if (address === undefined){
        res.status(404);
    }else{
        await processData()
        res.end
    }


})

module.exports = router;

