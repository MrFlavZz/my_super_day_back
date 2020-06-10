var express = require('express');
var router = express.Router();

const {verifySignUp} = require('../middleware/index');
const controller = require('../controllers/aut.controller');
/* GET users listing. */
router.post('/signup',  [
        verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup


);

router.post('/signin', controller.signin

);

module.exports = router;

