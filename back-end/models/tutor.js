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
    verified: {
        type : Boolean,
        required: true
      },


}, {timestamps: true})

const Tutor = new mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;