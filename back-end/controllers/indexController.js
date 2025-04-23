const auth = require('../auth')
const User = require('../models/user');
const Tutor = require('../models/tutor');
const Student = require('../models/student');


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
                first_name: 'First Name',
                last_name: 'Last Name',
                rate: 30,
                interviewed: false,
                verified: false,
                photo: 'https://res.cloudinary.com/djg9ttgrn/image/upload/v1712280077/s8vwpudk7bhwkp0axgng.jpg',
                bio: 'default',
                subjects: [],
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

    Student.find({email : req.body.username})
    .then(async result => {

        if(result.length === 0){

            const hashedPassword = await auth.hashPassword(req.body.password)
            const details = {
                email: req.body.username,
                password: hashedPassword,
                first_name: 'First Name',
                last_name: 'Last Name',
                emailVerified: false,
                stripeVerified: false,
                photo: 'https://res.cloudinary.com/djg9ttgrn/image/upload/v1712280077/s8vwpudk7bhwkp0axgng.jpg',
            }
            const newStudent = new Student(details)

            newStudent.save()
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
    email = req.body.username
    Student.find({email: email})
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
                res.cookie('studentjwt', accessToken, { httpOnly: true, path: '/', sameSite: 'None', secure: true })
                res.json('Success')
            }else{
                res.json('Incorrect')
            }
            
        }
    })
}

async function membershipTotal(req,res){

    const count = await Student.countDocuments({ membership: { $ne: null } })
    res.json(count)
}

module.exports = {
    login,
    tutorSignup,
    studentSignup,
    tutorLogin,
    studentLogin,
    membershipTotal,
}