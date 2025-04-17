const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({

    student_id: {
        type: String,
        required: true,
        index: true,
    },
    tutor_id: {
        type: String,
        required: true,
        index: true,
    },
    subject: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        validate: {
            validator: (v) => v % 15 === 0,
            message: 'Duration must be in multiples of 15 minutes'
        }
    },
    rate: {
        type: Number,
        required: true
    },
    tutor_confirmed: {
        type: Boolean,
        required: true
    },
    student_confirmed: {
        type: Boolean,
        required: true
    },
    student_paid: {
        type: Boolean,
        required: true
    },
    tutor_paid: {
        type: Boolean,
        required: true
    },

}, { timestamps: true })

const Lesson = new mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;