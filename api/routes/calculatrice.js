var express = require('express');
var router = express.Router();
const {authJwt} = require('../middleware/index');

/* GET home page. */
router.post('/getVariable', [authJwt.verifyToken,], async function (req, res, next) {

});

module.exports = router;
