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
                first_name: 'First Name',
                last_name: 'Last Name',
                rate: 30,
                interviewed: false,
                verified: false,
                photo: 'https://res.cloudinary.com/djg9ttgrn/image/upload/v1712280077/s8vwpudk7bhwkp0axgng.jpg',
                bio: 'default'
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

    const userId = req.userInfo.userId;

    Tutor.find({_id: userId})
    .then(async result => {
        const emailToken = auth.generateVerificationToken(result[0].email)
        const email = result[0].email
        await auth.sendVerificationEmail(email, emailToken)
        res.status(200).json('email sent')
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
    console.log('studentLogin')
    res.json('working')
}

async function verifyEmail(req,res){

    const {token} = req.query


    if (token == null){return res.status(401).json('Token Not Found')}


    
    const email = await auth.jwt.verify(token, process.env.SECRET, (err, emailInfo) => {
        if(err){
          return res.status(403).json('Token No Longer Valid')
        }
        return emailInfo.email
    })

    console.log(email)

    Tutor.find({email: email})
    .then(result => {

        console.log('inside')
        
        userId = result[0]._id

        console.log(userId)

        Tutor.findByIdAndUpdate(userId, {verified: true})
        .then(result => {
            console.log('here')
            res.redirect(process.env.profileReroute)
        })
    })
    .catch(err => res.status(500).json(err))

    


}

module.exports = {
    login,
    tutorSignup,
    studentSignup,
    initiateEmailVerification,
    tutorLogin,
    studentLogin,
    verifyEmail,
}