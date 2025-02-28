const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({

    availability : {
        type : Array,
        required : true,
    },
    week: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
      },
      creator : {
        type : String,
        required : true,
        index: true,
    },


}, {timestamps: true})

const Schedule = new mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;