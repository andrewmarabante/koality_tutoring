const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    password : {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    stripe_id : {
        type : String,
    },
    stripeVerified : {
        type : Boolean,
        required : true
    },
    availability : {
        type : Array,
    },
    age : {
        type : Number,
    },
    subject : {
        type : String,
    },
    emailVerified : {
        type : Boolean,
        required : true
    },
    photo : {
        type : String,
    },
    frequency : {
        type : String,
    },
    membershipFrequency : {
        type : String,
    },
    customerId : {
        type : String,
    },
    membership : {
        type : String,
    },

}, {timestamps: true})

const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;