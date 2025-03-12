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
    education: {
        type : String,
      },
    rate: {
        type : Number,
        required: true
      },
      hours: {
        type : Number,
      },
      rating: {
        type : Number,
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
      title: {
        type : String,
      },
      photo: {
        type : String,
        required: true
      },
      subjects: {
        type : Array,
        required: true
      },
      reviews: {
        type : Array,
      },
      students: {
        type : Array,
        required: false
      },
      topReview: {
        type : String,
      },

}, {timestamps: true})

const Tutor = new mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;