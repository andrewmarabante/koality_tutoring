var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexController.js')


/* GET home page. */

router.post('/login', indexControllers.login)

router.get('/verifyEmail', indexControllers.verifyEmail)


module.exports = router;
