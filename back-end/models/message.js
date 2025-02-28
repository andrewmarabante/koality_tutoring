const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    sender_id : {
        type : String,
        required : true
    },
    chat_id : {
        type : String,
        required : true,
        index: true,
    },
    body : {
        type : String,
        required : true
    },
    read : {
        type : Boolean,
        required : true
    },
    images : {
        type : Array,
    },
    


}, {timestamps: true})

const Message = new mongoose.model('Message', messageSchema);

module.exports = Message;