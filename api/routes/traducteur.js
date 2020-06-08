
var express = require("express");
var router = express.Router();
var fetch = require('node-fetch');
const {Translate} = require('@google-cloud/translate').v2;

router.post('/',async function (req, res) {
// Imports the Google Cloud client library

// Creates a client
    const translate = new Translate();
    const text = req.body.text;
    const target = req.body.langCible;
    let traduction = ''
    async function translateText() {
        // Translates the text into the target language. "text" can be a string for
        // translating a single piece of text, or an array of strings for translating
        // multiple texts.
        let [translations] = await translate.translate(text, target);
        translations = Array.isArray(translations) ? translations : [translations];
        translations.forEach((translation, i) => {
            traduction=translation
        });
        console.log(traduction)
        await res.json({
            trad:traduction
            }
        );
    }

    translateText();
})

module.exports = router
