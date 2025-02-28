const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({

    users : {
        type : Array,
        required : true,
        index: true,
    },
    name : {
        type : String,
    },
    initialized : {
        type : Boolean,
        required: true
    },



}, {timestamps: true})

const Chat = new mongoose.model('Chat', chatSchema);

module.exports = Chat;