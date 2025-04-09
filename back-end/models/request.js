const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({

    studentId : {
        type : String,
        required : true
    },
    tutorId: {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    frequency : {
        type : String,
        required : true
    },
    accepted : {
        type : Boolean,
        required : true
    },


}, {timestamps: true})

const Request = new mongoose.model('Request', requestSchema);

module.exports = Request;