const Tutor = require('../models/tutor');
const Schedule = require('../models/schedule');
const Message = require('../models/message');
const Lesson = require('../models/lesson');
const Chat = require('../models/chat');
const auth = require('../auth')


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
            subjects: user.subjects,
            title: user.title,
            education: user.education,
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

function getSchedule(req,res){

    const userId = req.userInfo.userId

    Schedule.aggregate([
        {
            $match: { 'creator': userId } //grabs only the users schedules
        },
        {
          $sort: { createdAt: -1 } // Sort by creation date (newest first)
        },
        {
          $group: {
            _id: { 
                start: { $dateToString: { format: "%Y-%m-%d",           date: {
                    $dateFromParts: {
                      year: { $year: { date: "$week.start", timezone: "America/Los_Angeles" } }, 
                      month: { $month: { date: "$week.start", timezone: "America/Los_Angeles" } }, 
                      day: { $dayOfMonth: { date: "$week.start", timezone: "America/Los_Angeles" } }
                    }
                  } } } 
              }, // Group by week.start
            latestSchedule: { $first: "$$ROOT" } // Pick the first (latest) document in each group
          }
        },
        {
          $replaceRoot: { newRoot: "$latestSchedule" } // Replace result structure
        }
      ])
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => res.status(500).json(err))
}

function createSchedule(req,res){

    const userId = req.userInfo.userId
    const availability = req.body.availability;
    const week = req.body.week;

    const newScheduleDetails = {
        availability: availability,
        week: week,
        creator: userId,
    }

    const newSchedule =  new Schedule(newScheduleDetails)

    newSchedule.save()
    .then(() => res.status(200).json('saved'))
    .catch(err => res.status(500).json(err))
}

function createMessage(req,res){
    const {body, chatId, senderId} = req.body

    const messageData = {
        body: body,
        chatId: chatId,
        senderId, senderId

    }

    const newMessage = new Message(messageData);

    newMessage.save()
    .then((messageResult) => {

        Chat.findByIdAndUpdate(messageResult.chatId, {
            last_message: messageResult.body,
            last_message_date: messageResult.createdAt
        }, { runValidators: true, new: true })
        .then(chatResult => {
            res.status(200).json({messageResult: messageResult, chatResult: chatResult})
        })

    })
    .catch(err => res.status(500).json(err))

}

function getChats(req,res){

    const userId = req.userInfo.userId

    Chat.find({ 'users._id' : userId })
    .then(result => {
        res.status(200).json([result, userId])
    })
    .catch(err => res.status(500).json(err))
}

function getStudents(req,res){

    const userId = req.userInfo.userId

    Tutor.find({_id: userId})
    .then(result => {
        const students = result[0].students;
        res.status(200).json(students)    
    })

}

async function initiateEmailVerification(req,res){

    const userId = req.userInfo.userId;

    Tutor.find({_id: userId})
    .then(async result => {
        const emailToken = auth.generateVerificationToken(result[0].email)
        const email = result[0].email
        await auth.sendTutorVerificationEmail(email, emailToken)
        res.status(200).json('email sent')
    })

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

    Tutor.find({email: email})
    .then(result => {
        
        userId = result[0]._id

        Tutor.findByIdAndUpdate(userId, {verified: true})
        .then(result => {
            res.redirect(process.env.tutorReroute)
        })
    })
    .catch(err => res.status(500).json(err))

    


}

function getMessages(req,res){
    const chatId = req.body.chatId

    Message.find({ chatId: chatId})
    .then(result => {
        res.status(200).json(result)

    })
    .catch(err => res.status(500).json(err))
}

function submitLesson(req,res){

    const tutorId = req.userInfo.userId;
    
    const {studentId, duration, rate, subject, lessonType, tutorConfirmed, tutorName, studentName} = req.body
   
    const lessonData = {
        tutor_id: tutorId,
        student_id: studentId,
        tutor_name: tutorName,
        student_name: studentName,
        subject: subject,
        duration: duration,
        rate: rate,
        lesson_type: lessonType,
        tutor_confirmed: true,
        student_confirmed: false,
        student_paid: false,
        tutor_paid: false,
        student_denied: false
    }
    
    const newLesson = new Lesson(lessonData)

    newLesson.save()
    .then(() => {
        res.json('saved')
    })
    .catch(err => res.json(err))


}

function getLessons(req,res){

    const userId = req.userInfo.userId

    Lesson.find({tutor_id : userId})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => res.status(500).json(err))

}

module.exports = {
    loadProfile,
    changeProfilePic,
    updateProfile,
    getSchedule,
    createSchedule,
    createMessage,
    getChats,
    getStudents,
    initiateEmailVerification,
    verifyEmail,
    getMessages,
    submitLesson,
    getLessons,
}