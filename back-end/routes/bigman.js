var express = require('express');
var router = express.Router();
const bigmanControllers = require('../controllers/bigmanController.js')


/* GET home page. */
router.get('/', bigmanControllers.getSchedule);

router.post('/', bigmanControllers.newSchedule);

module.exports = router;
