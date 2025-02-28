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

router.get('/getSchedule', auth.verifyTutorToken, tutorController.getSchedule)

router.post('/createSchedule', auth.verifyTutorToken, tutorController.createSchedule)

router.post('/createMessage', auth.verifyTutorToken, upload.array('image', 5), tutorController.createMessage)

router.get('/getChats', auth.verifyTutorToken , tutorController.getChats)

router.get('/getStudents', auth.verifyTutorToken , tutorController.getStudents)






//last thing i was doing was trying to set up this route

module.exports = router;
