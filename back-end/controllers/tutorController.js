const Tutor = require('../models/tutor');
const cloudinary = require('../cloudinary');

function loadProfile(req, res){
    const userId = req.userInfo.userId

    Tutor.find({_id: userId})
    .then(result => {

        const user = result[0]

        const userInfo = {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            rate: user.rate,
            interviewed: user.interviewed,
            verified: user.verified,
            photo: user.photo,
            bio: user.bio,
            subject1: user.subject1,
            subject2: user.subject2,
            subject3: user.subject3,
        }

        res.status(200).json(userInfo)
    })
    .catch(err => res.status(500).json(err))
}

function changeProfilePic(req, res){

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
        Tutor.findByIdAndUpdate( userId, {photo: profilePicURL })
        .then(() => {
            res.json('saved')
        })
        .catch(err => res.status(500).json(err))
    })
}

function updateProfile(req, res){
    const userId = req.userInfo.userId;

    const newData = req.body

    if(newData.email !== ''){
        newData.verified = false
    }

    const cleanedData = Object.fromEntries(
        Object.entries(newData).filter(([_, value]) => value !== '')
      );
    

    Tutor.findByIdAndUpdate(userId, {$set: cleanedData})
    .then(() => {
        res.status(200).json('updated')
    })
    .catch(err => res.status(500).json(err))

}

module.exports = {
    loadProfile,
    changeProfilePic,
    updateProfile
}