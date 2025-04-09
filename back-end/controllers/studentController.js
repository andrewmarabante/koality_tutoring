const Tutor = require('../models/tutor');
const Student = require('../models/student');
const Request = require('../models/request');
const Schedule = require('../models/schedule');
const Chat = require('../models/chat');
const Message = require('../models/message');
const auth = require('../auth')
const stripe = require("stripe")(process.env.stripeSecret)



const cloudinary = require('../cloudinary');


function loadProfile(req,res){
    const userId = req.userInfo.userId

    Student.find({_id: userId})
    .then(async result => {

        const user = result[0]

        let paymentMethods = []

        if(user.customerId){
            try {
                const paymentMethodsObj = await stripe.paymentMethods.list({ customer: user.customerId });
                paymentMethods = paymentMethodsObj.data
            } catch (error) {
                console.error('Error fetching payment methods:', error);
              }
        }

        const userInfo = {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            emailVerified: user.emailVerified,
            stripeVerified: user.stripeVerified,
            photo: user.photo,
            paymentMethods: paymentMethods
        }

        res.status(200).json(userInfo)
    })
    .catch(err => res.status(500).json(err))
}

function updateProfile(req, res){
    const userId = req.userInfo.userId;

    const newData = req.body

    if(newData.email !== ''){
        newData.emailVerified = false
    }

    const cleanedData = Object.fromEntries(
        Object.entries(newData).filter(([_, value]) => value !== '')
      );
    

    Student.findByIdAndUpdate(userId, {$set: cleanedData})
    .then(() => {
        res.status(200).json('updated')
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
        Student.findByIdAndUpdate( userId, {photo: profilePicURL })
        .then(() => {
            res.json('saved')
        })
        .catch(err => res.status(500).json(err))
    })
}

async function initiateEmailVerification(req,res){

    const userId = req.userInfo.userId;

    Student.find({_id: userId})
    .then(async result => {
        const emailToken = auth.generateVerificationToken(result[0].email)
        const email = result[0].email
        await auth.sendStudentVerificationEmail(email, emailToken)
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

    Student.find({email: email})
    .then(result => {
        
        userId = result[0]._id

        Student.findByIdAndUpdate(userId, {emailVerified: true})
        .then(result => {
            res.redirect(process.env.studentReroute)
        })
    })
    .catch(err => res.status(500).json(err))

    


}

function createPaymentMethod(req,res){
    const userId = req.userInfo.userId
    const {email, payment_method} = req.body;

    Student.find({_id : userId})
    .then( async result => {
        const customerId = result[0].customerId
        if(customerId){ 

            try {

                const paymentMethods = await stripe.paymentMethods.list({
                    customer: customerId,
                    type: 'card',
                });

                if(paymentMethods.data.length > 0){
                    await stripe.paymentMethods.detach(paymentMethods.data[0].id);
                }
                
                await stripe.paymentMethods.attach(payment_method, { customer: customerId });
                await stripe.customers.update(customerId, { invoice_settings: { default_payment_method: payment_method }});

                try{
                    const intent = await stripe.setupIntents.create({
                        customer: customerId,
                        payment_method: payment_method,
                        confirm: true,
                        automatic_payment_methods: { enabled: true },
                        return_url: 'http://localhost:5173/student',
                    });
    
                    if (intent.status === "succeeded") {
                        res.status(200).json('success')
                    }else{
                        await stripe.paymentMethods.detach(payment_method, { customer: customerId });
                        res.status(200).json('failure')
                    }
                } catch (error) {
                    res.status(500).json(error)
                }
              

            } catch (error) {
                res.status(500).json({ error: error.message });
            }

        }else{
            const customer = await stripe.customers.create({
            email: email,
            payment_method: payment_method,
            invoice_settings: {
                default_payment_method: payment_method,
            },
            });

            try{
                const intent = await stripe.paymentIntents.create({
                    amount: 0, 
                    currency: "usd",
                    payment_method: payment_method,
                    customer: customer.id,
                    confirm: true,
                });

                if (intent.status === "succeeded") {

                    Student.findByIdAndUpdate(userId, { customerId: customer.id, defaultPayment: payment_method })
                    .then(() => res.status(200).json('success'))
                    .catch(err => res.status(500).json(err))   
                                 
                }else{
                    await stripe.paymentMethods.detach(payment_method, { customer: customerId });
                    res.status(200).json('no funds')
                }
            } catch (error) {
                res.status(500).json(error)
            }

            
        }
    })
}

function getTutors(req,res){

    Tutor.find({})
    .then(result => {
        const verifiedTutors = result.filter(tutor => tutor.interviewed === true)
        res.status(200).json(verifiedTutors)
    })
    .catch(err => res.status(500).json(err))
}

function newRequest(req,res){

    const userId = req.userInfo.userId

    const requestData = {
        ...req.body,
        studentId: userId,
        accepted: false,
    }

    const newRequest = new Request(requestData)

    newRequest.save()
    .then(async () => {

        const [tutor, student] = await Promise.all([
            Tutor.findById(requestData.tutorId).select('_id first_name last_name photo'),
            Student.findById(requestData.studentId).select('_id first_name last_name photo')
          ]);

        const chatData = {
            users: [tutor, student],
            name: 'default',
            last_message: requestData.message,
            last_message_date: new Date()
        }

        const newChat = new Chat(chatData)

        newChat.save()
        .then((result) => {

            const chatId = result._id.toString();

            const messageData = {
                senderId: userId,
                chatId: chatId,
                body: requestData.message,
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
    .catch(err => res.status(500).json(err))
}

module.exports = {
    loadProfile,
    updateProfile,
    changeProfilePic,
    initiateEmailVerification,
    verifyEmail,
    createPaymentMethod,
    getTutors,
    newRequest,
}