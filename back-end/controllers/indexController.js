const auth = require('../auth')
const User = require('../models/user');
const Tutor = require('../models/tutor');
const Student = require('../models/student');
const Chat = require('../models/chat');
const Report = require('../models/report');
const Message = require('../models/message');

const { picture } = require('../cloudinary');


function login(req, res) {

    User.find({ username: req.body.username })
        .then(async result => {
            if (result.length === 0) {
                res.json('Incorrect')
            }
            else {
                const enteredPassword = req.body.password;
                const storedHash = result[0].password

                const isMatch = await auth.verifyPassword(enteredPassword, storedHash)

                if (isMatch) {
                    accessToken = auth.createToken(result[0]._id)
                    res.cookie('bigmanjwt', accessToken, { httpOnly: true, path: '/', sameSite: 'None', secure: true })
                    res.json('Success')
                } else {
                    res.json('Incorrect')
                }

            }
        })
        .catch(err => res.json(err))
}

function tutorSignup(req, res) {


    Tutor.find({ email: req.body.username })
        .then(async result => {

            if (result.length === 0) {

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
                    .then(async (result) => {

                        const [bossman, tutor] = await Promise.all([
                            Tutor.findById(process.env.bossmanId).select('_id first_name last_name photo'),
                            Tutor.findById(result._id).select('_id first_name last_name photo')
                        ]);
                        const message = "Hello!! Welcome to Koality Tutoring, if you need help with anything please don't hesitate to ask me."
                        const chatData = {
                            users: [bossman, tutor],
                            name: 'default',
                            last_message: message,
                            last_message_date: new Date()
                        }
                        const newChat = new Chat(chatData)

                        newChat.save()
                            .then((result) => {
                                const chatId = result._id.toString();

                                const messageData = {
                                    senderId: bossman._id,
                                    chatId: chatId,
                                    body: message,
                                }

                                const newMessage = new Message(messageData)

                                newMessage.save()
                                    .then(() => {
                                        res.status(200).json('success')
                                    })
                                    .catch(err => res.status(500).json(err))
                            })
                            .catch(err => res.status(500).json(err))

                    })
                    .catch((err) => {
                        res.status(500).json(err)
                    })

            }
            else {
                res.json('email taken')
            }
        })
}

function studentSignup(req, res) {

    Student.find({ email: req.body.username })
        .then(async result => {

            if (result.length === 0) {

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
                    .then(async (result) => {

                        const [bossman, student] = await Promise.all([
                            Tutor.findById(process.env.bossmanId).select('_id first_name last_name photo'),
                            Student.findById(result._id).select('_id first_name last_name photo')
                        ]);
                        const message = "Hello!! Welcome to Koality Tutoring, if you need help with anything please don't hesitate to ask me."
                        const chatData = {
                            users: [bossman, student],
                            name: 'default',
                            last_message: message,
                            last_message_date: new Date()
                        }
                        const newChat = new Chat(chatData)

                        newChat.save()
                            .then((result) => {
                                const chatId = result._id.toString();

                                const messageData = {
                                    senderId: bossman._id,
                                    chatId: chatId,
                                    body: message,
                                }

                                const newMessage = new Message(messageData)

                                newMessage.save()
                                    .then(() => {
                                        res.status(200).json('success')
                                    })
                                    .catch(err => res.status(500).json(err))
                            })
                            .catch(err => res.status(500).json(err))

                    })
                    .catch((err) => {
                        res.status(500).json(err)
                    })

            }
            else {
                res.json('email taken')
            }
        })
}


function tutorLogin(req, res) {

    email = req.body.username
    Tutor.find({ email: email })
        .then(async result => {
            if (result.length === 0) {
                res.json('Incorrect')
            }
            else {
                const enteredPassword = req.body.password;
                const storedHash = result[0].password

                if (!storedHash) {
                    res.json('google')
                } else {
                    const isMatch = await auth.verifyPassword(enteredPassword, storedHash)

                    if (isMatch) {
                        accessToken = auth.createToken(result[0]._id)
                        res.cookie('tutorjwt', accessToken, { httpOnly: true, path: '/', sameSite: 'None', secure: true })
                        res.json('Success')
                    } else {
                        res.json('Incorrect')
                    }
                }

            }
        })
}

function studentLogin(req, res) {
    email = req.body.username
    Student.find({ email: email })
        .then(async result => {
            if (result.length === 0) {
                res.json('Incorrect')
            }
            else {
                const enteredPassword = req.body.password;
                const storedHash = result[0].password

                if (!storedHash) {
                    res.json('google')
                } else {
                    const isMatch = await auth.verifyPassword(enteredPassword, storedHash)

                    if (isMatch) {
                        accessToken = auth.createToken(result[0]._id)
                        res.cookie('studentjwt', accessToken, { httpOnly: true, path: '/', sameSite: 'None', secure: true })
                        res.json('Success')
                    } else {
                        res.json('Incorrect')
                    }
                }

            }
        })
}

async function membershipTotal(req, res) {

    const count = await Student.countDocuments({
        membership: { $ne: null, $ne: "" }
    });
    res.json(count)
}

function reportBug(req, res) {

    const reportData = req.body


    const newReport = new Report(reportData)

    newReport.save()
        .then(() => {
            res.status(200).json('saved')
        })
        .catch(err => res.status(500).json(err))


}

async function googleLogin(req, res) {

    const role = req.session.role
    const user = req.user._json

    if (role === 'student') {
        Student.find({ email: user.email })
            .then(result => {
                if (result.length === 0) {
                    const userData = {
                        first_name: user.given_name,
                        last_name: user.family_name,
                        email: user.email,
                        photo: user.picture ? user.picture : 'https://res.cloudinary.com/djg9ttgrn/image/upload/v1712280077/s8vwpudk7bhwkp0axgng.jpg',
                        emailVerified: true,
                        stripeVerified: false,
                    }

                    const newStudent = new Student(userData)

                    newStudent.save()
                        .then(async studentResult => {

                            const [bossman, student] = await Promise.all([
                                Tutor.findById(process.env.bossmanId).select('_id first_name last_name photo'),
                                Student.findById(studentResult._id).select('_id first_name last_name photo')
                            ]);
                            const message = "Hello!! Welcome to Koality Tutoring, if you need help with anything please don't hesitate to ask me."
                            const chatData = {
                                users: [bossman, student],
                                name: 'default',
                                last_message: message,
                                last_message_date: new Date()
                            }

                            const newChat = new Chat(chatData)

                            newChat.save()
                                .then((result) => {

                                    const chatId = result._id.toString();

                                    const messageData = {
                                        senderId: bossman._id,
                                        chatId: chatId,
                                        body: message,
                                    }

                                    const newMessage = new Message(messageData)

                                    newMessage.save()
                                        .then(() => {
                                            accessToken = auth.createToken(studentResult._id)
                                            res.cookie('studentjwt', accessToken, { httpOnly: true, path: '/', sameSite: 'None', secure: true })
                                            res.redirect(process.env.studentReroute)
                                        })
                                        .catch(err => res.status(500).json(err))
                                })
                                .catch(err => res.status(500).json(err))
                        })
                        .catch(err => res.json(err))
                } else {
                    accessToken = auth.createToken(result[0]._id)
                    res.cookie('studentjwt', accessToken, { httpOnly: true, path: '/', sameSite: 'None', secure: true })
                    res.redirect(process.env.studentReroute)
                }
            })
    } else if (role === 'tutor') {
        Tutor.find({ email: user.email })
            .then(result => {
                if (result.length === 0) {
                    const userData = {
                        first_name: user.given_name,
                        last_name: user.family_name,
                        email: user.email,
                        photo: user.picture ? user.picture : 'https://res.cloudinary.com/djg9ttgrn/image/upload/v1712280077/s8vwpudk7bhwkp0axgng.jpg',
                        rate: 30,
                        interviewed: false,
                        verified: true,
                        bio: 'default',
                        subjects: [],

                    }


                    const newTutor = new Tutor(userData)

                    newTutor.save()
                        .then(async tutorResult => {

                            const [bossman, tutor] = await Promise.all([
                                Tutor.findById(process.env.bossmanId).select('_id first_name last_name photo'),
                                Tutor.findById(tutorResult._id).select('_id first_name last_name photo')
                            ]);
                            const message = "Hello!! Welcome to Koality Tutoring, if you need help with anything please don't hesitate to ask me."
                            const chatData = {
                                users: [bossman, tutor],
                                name: 'default',
                                last_message: message,
                                last_message_date: new Date()
                            }

                            const newChat = new Chat(chatData)

                            newChat.save()
                                .then((result) => {

                                    const chatId = result._id.toString();

                                    const messageData = {
                                        senderId: bossman._id,
                                        chatId: chatId,
                                        body: message,
                                    }

                                    const newMessage = new Message(messageData)

                                    newMessage.save()
                                        .then(() => {
                                            accessToken = auth.createToken(tutorResult._id)
                                            res.cookie('tutorjwt', accessToken, { httpOnly: true, path: '/', sameSite: 'None', secure: true })
                                            res.redirect(process.env.tutorReroute)
                                        })
                                        .catch(err => res.status(500).json(err))
                                })
                                .catch(err => res.status(500).json(err))
                        })
                        .catch(err => res.json(err))
                } else {
                    accessToken = auth.createToken(result[0]._id)
                    res.cookie('tutorjwt', accessToken, { httpOnly: true, path: '/', sameSite: 'None', secure: true })
                    res.redirect(process.env.tutorReroute)
                }
            })
    }
}

function logoutTutor(req, res) {

    res.clearCookie('tutorjwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        path: '/',
    });

    res.json('success')
}

function logoutStudent(req, res) {

    res.clearCookie('studentjwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        path: '/',
    });

    res.json('success')
}

module.exports = {
    login,
    tutorSignup,
    studentSignup,
    tutorLogin,
    studentLogin,
    membershipTotal,
    reportBug,
    googleLogin,
    logoutStudent,
    logoutTutor,
}