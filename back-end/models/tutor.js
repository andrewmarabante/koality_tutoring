const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorSchema = new Schema({

    email : {
        type : String,
        required : true,
    },
    password: {
        type : String,
        required: true
      },
    first_name: {
        type : String,
        required: true
      },
    last_name: {
        type : String,
        required: true
      },
    rate: {
        type : Number,
        required: true
      },
    verified: {
        type : Boolean,
        required: true
      },
    interviewed: {
        type : Boolean,
        required: true
      },
      bio: {
        type : String,
        required: true
      },
      photo: {
        type : String,
        required: true
      },
      subject1: {
        type : String,
        required: false
      },
      subject2: {
        type : String,
        required: false
      },
      subject3: {
        type : String,
        required: false
      },


}, {timestamps: true})

const Tutor = new mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;