const auth = require('../auth')
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

            const isMatch = await auth.verifyPassword(enteredPassword, storedHash)
            
            if(isMatch){
                accessToken = auth.createToken(result[0]._id)
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


    Tutor.find({email : req.body.username})
    .then(async result => {

        if(result.length === 0){

            const hashedPassword = await auth.hashPassword(req.body.password)
            const details = {
                email: req.body.username,
                password: hashedPassword,
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

async function initiateEmailVerification(req,res){    
    const emailToken = auth.generateVerificationToken(req.body.email)
    await auth.sendVerificationEmail(req.body.email, emailToken)
    res.status(200).json('email sent')
}

function tutorLogin(req,res){

    email = req.body.username
    Tutor.find({email: email})
    .then(async result => {
        if(result.length === 0){
            res.json('Incorrect')
        }
        else{
            const enteredPassword = req.body.password;
            const storedHash = result[0].password
            
            const isMatch = await auth.verifyPassword(enteredPassword, storedHash)
            
            if(isMatch){
                accessToken = auth.createToken(result[0]._id)
                res.cookie('tutorjwt', accessToken, { httpOnly: true, path: '/', sameSite: 'None', secure: true })
                res.json('Success')
            }else{
                res.json('Incorrect')
            }
            
        }
    })
}

function studentLogin(req,res){
    console.log('studentLogin')
    res.json('working')
}

module.exports = {
    login,
    tutorSignup,
    studentSignup,
    initiateEmailVerification,
    tutorLogin,
    studentLogin
}