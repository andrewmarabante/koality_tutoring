const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({

    title : {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true,
    },

}, {timestamps: true})

const Report = new mongoose.model('Report', reportSchema);

module.exports = Report;