var express = require('express');
var router = express.Router();
const tutorController = require('../controllers/tutorController.js')
const indexController = require('../controllers/indexController.js')
const upload = require('../multer')

const auth = require('../auth.js')


/* GET home page. */

router.get('/profile', auth.verifyTutorToken , tutorController.loadProfile)

router.get('/emailVerification', auth.verifyTutorToken , indexController.initiateEmailVerification)

router.post('/changeProfilePic', auth.verifyTutorToken, upload.single('image'), tutorController.changeProfilePic)

router.post('/updateProfile', auth.verifyTutorToken, tutorController.updateProfile)




//last thing i was doing was trying to set up this route

module.exports = router;
