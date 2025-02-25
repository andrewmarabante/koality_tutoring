var express = require('express');
var router = express.Router();
const bigmanControllers = require('../controllers/bigmanController.js')
const auth = require('../auth.js')

/* GET home page. */
router.get('/', bigmanControllers.getSchedule);

router.post('/', auth.verifyToken, bigmanControllers.newSchedule);

module.exports = router;
