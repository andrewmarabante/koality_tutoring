const security = require('../security')
const User = require('../models/user');
const Tutor = require('../models/tutor');

 function login(req, res){

    User.find({username: req.body.username})
    .then(async result => {
        if(result.length === 0){
            res.json('Incorrect')
        }
        else{
            const enteredPassword = req.body.password;
            const storedHash = result[0].password

            const isMatch = await security.verifyPassword(enteredPassword, storedHash)
            
            if(isMatch){
                accessToken = security.createToken(result[0]._id)
                res.cookie('bigmanjwt', accessToken, { httpOnly: true, path: '/', sameSite: 'None', secure: true })
                res.json('Success')
            }else{
                res.json('Incorrect')
            }
            
        }
    })
    .catch(err => res.json(err))
}

function tutorSignup(req,res){
    console.log(req.body)
    Tutor.find({email : req.body.username})
    .then((result) => {
        if(result.length === 0){
            const details = {
                email: req.body.username,
                password: req.body.password,
                verified: false
            }
            const newTutor = new Tutor(details)

            newTutor.save()
            .then(() => {
                res.json('saved')
            })
            .catch((err) => {
                res.status(500).json(err)
            })
            
        }
        else{
            res.json('email taken')
        }
    })
}

function studentSignup(req,res){
    console.log(req.body)
    res.json('student')
}

module.exports = {
    login,
    tutorSignup,
    studentSignup
}