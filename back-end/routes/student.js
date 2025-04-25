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

router.post('/newRequest', auth.verifyStudentToken, studentController.newRequest)

router.get('/getChats', auth.verifyStudentToken, studentController.getChats)

router.get('/getLessons', auth.verifyStudentToken, studentController.getLessons)

router.post('/getMessages', auth.verifyStudentToken, studentController.getMessages)

router.post('/confirmLesson', auth.verifyStudentToken, studentController.confirmLesson)

router.post('/createMessage', auth.verifyStudentToken, upload.array('image', 5), studentController.createMessage)

router.post('/subscribe', auth.verifyStudentToken, studentController.subscribe)

router.post('/cancelSubscription', auth.verifyStudentToken, studentController.cancelSubscription)

router.post('/updateAvailability', auth.verifyStudentToken, studentController.updateAvailability)





//last thing i was doing was trying to set up this route

module.exports = router;
