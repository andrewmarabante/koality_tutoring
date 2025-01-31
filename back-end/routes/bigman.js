var express = require('express');
var router = express.Router();
const bigmanControllers = require('../controllers/bigmanController.js')
const security = require('../security.js')

/* GET home page. */
router.get('/', bigmanControllers.getSchedule);

router.post('/', security.verifyToken, bigmanControllers.newSchedule);

module.exports = router;
