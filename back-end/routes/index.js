var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexController.js')


/* GET home page. */

router.post('/login', indexControllers.login)

router.get('/membershipTotal', indexControllers.membershipTotal)

router.post('/reportBug', indexControllers.reportBug)

router.post('/logoutStudent', indexControllers.logoutStudent)

router.post('/logoutTutor', indexControllers.logoutTutor)


module.exports = router;
