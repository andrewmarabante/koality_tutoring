var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexController.js')


/* GET home page. */

router.post('/tutor', indexControllers.tutorSignup)

router.post('/student', indexControllers.studentSignup)



//last thing i was doing was trying to set up this route

module.exports = router;
