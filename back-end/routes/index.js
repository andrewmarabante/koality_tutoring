var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexController.js')


/* GET home page. */
router.get('/', indexControllers.getSchedule);

module.exports = router;
