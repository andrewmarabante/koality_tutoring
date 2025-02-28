var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController.js')
const upload = require('../multer')

const auth = require('../auth.js')

/* GET home page. */


router.get('/profile', auth.verifyStudentToken, studentController.loadProfile)

router.get('/emailVerification', auth.verifyStudentToken, studentController.initiateEmailVerification)

router.post('/updateProfile', auth.verifyStudentToken, studentController.updateProfile)

router.post('/changeProfilePic', auth.verifyStudentToken, upload.single('image'), studentController.changeProfilePic)


//last thing i was doing was trying to set up this route

module.exports = router;
