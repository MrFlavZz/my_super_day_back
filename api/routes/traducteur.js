
var express = require("express");
var router = express.Router();
var fetch = require('node-fetch');
const {Translate} = require('@google-cloud/translate').v2;
const {authJwt} = require('../middleware/index');

router.post('/getTraduction', [authJwt.verifyToken],async function (req, res) {

    const translate = new Translate();
    const text = req.body.text;
    const target = req.body.langCible;
    let traduction = ''

    async function translateText() {

        let [translations] = await translate.translate(text, target);

        translations = Array.isArray(translations) ? translations : [translations];
        translations.forEach((translation, i) => {
            traduction=translation
        });
         res.json({
            trad:traduction
            }
        );
    }

    await translateText();
})

module.exports = router
