var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController.js')
const indexController = require('../controllers/indexController.js')
const upload = require('../multer')

const auth = require('../auth.js')

/* GET home page. */


router.get('/profile', auth.verifyStudentToken, studentController.loadProfile)

router.get('/emailVerification', auth.verifyStudentToken, studentController.initiateEmailVerification)

router.get('/verifyEmail', studentController.verifyEmail)

router.post('/updateProfile', auth.verifyStudentToken, studentController.updateProfile)

router.post('/changeProfilePic', auth.verifyStudentToken, upload.single('image'), studentController.changeProfilePic)

router.post('/createPaymentMethod', auth.verifyStudentToken, studentController.createPaymentMethod)

router.get('/getTutors', auth.verifyStudentToken, studentController.getTutors)


//last thing i was doing was trying to set up this route

module.exports = router;
