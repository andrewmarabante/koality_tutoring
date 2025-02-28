const Tutor = require('../models/tutor');
const Student = require('../models/student');
const Schedule = require('../models/schedule');
const Message = require('../models/message');

const cloudinary = require('../cloudinary');


function loadProfile(req,res){
    const userId = req.userInfo.userId

    Student.find({_id: userId})
    .then(result => {

        const user = result[0]

        const userInfo = {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            emailVerified: user.emailVerified,
            stripeVerified: user.stripeVerified,
            photo: user.photo,
        }

        res.status(200).json(userInfo)
    })
    .catch(err => res.status(500).json(err))
}

function initiateEmailVerification(req,res){
    res.json('email')
}

function updateProfile(req,res){
    res.json('Updated')
}

function changeProfilePic(req, res){

    console.log(req.body)

    left = ',x_'+req.body.left;
    top = ',y_'+req.body.top;
    height = ',h_'+req.body.height;
    width = ',w_'+req.body.width;

    transformations = 'c_crop'+height+width+left+top + '/';

    cloudinary.uploader.upload(req.file.path, function(err, result){
        if(err){
            console.log(err)
            return res.status(500).json(err)
        }
        url = result.url
        splitURL = url.split('upload/')
        origin = splitURL[0]+'upload/'
        image = splitURL[1]

        profilePicURL = origin + transformations + image

        const userId = req.userInfo.userId
        Student.findByIdAndUpdate( userId, {photo: profilePicURL })
        .then(() => {
            res.json('saved')
        })
        .catch(err => res.status(500).json(err))
    })
}

module.exports = {
    loadProfile,
    initiateEmailVerification,
    updateProfile,
    changeProfilePic
}