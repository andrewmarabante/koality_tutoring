const security = require('../security')
const User = require('../models/user');

// async function createAcc(req, res){
//     const hash = await security.hashPassword(req.body.password)

//     const userDetails = {
//         username: req.body.username,
//         password: hash
//     }

//     const newUser = new User(userDetails)

//     newUser.save()
//     .then(() => {
//         res.json('saved')
//     })
//     .catch(err => res.json(err))


// }

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

module.exports = {
    login,
}