var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexController.js')
const auth = require('../auth.js')



/* GET home page. */

router.post('/tutor', indexControllers.tutorLogin)

router.post('/student', indexControllers.studentLogin)

router.get('/google/redirect', auth.passport.authenticate('google', { session: false }), indexControllers.googleLogin)

router.get('/google/:role', (req, res, next) => {
  const role = req.params.role;
  auth.passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: role,
  })(req, res, next);
});



//last thing i was doing was trying to set up this route

module.exports = router;
