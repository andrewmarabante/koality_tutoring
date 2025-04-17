var express = require('express');
var router = express.Router();
const tutorController = require('../controllers/tutorController.js')
const upload = require('../multer')

const auth = require('../auth.js')


/* GET home page. */

router.get('/profile', auth.verifyTutorToken , tutorController.loadProfile)

router.get('/emailVerification', auth.verifyTutorToken , tutorController.initiateEmailVerification)

router.post('/changeProfilePic', auth.verifyTutorToken, upload.single('image'), tutorController.changeProfilePic)

router.post('/updateProfile', auth.verifyTutorToken, tutorController.updateProfile)

router.get('/getSchedule', auth.verifyTutorToken, tutorController.getSchedule)

router.post('/createSchedule', auth.verifyTutorToken, tutorController.createSchedule)

router.post('/createMessage', auth.verifyTutorToken, upload.array('image', 5), tutorController.createMessage)

router.get('/getChats', auth.verifyTutorToken , tutorController.getChats)

router.post('/getMessages', auth.verifyTutorToken , tutorController.getMessages)

router.post('/submitLesson', auth.verifyTutorToken , tutorController.submitLesson)

router.get('/getStudents', auth.verifyTutorToken , tutorController.getStudents)

router.get('/verifyEmail', tutorController.verifyEmail)








//last thing i was doing was trying to set up this route

module.exports = router;
