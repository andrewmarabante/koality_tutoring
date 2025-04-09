const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    users: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        photo: {
          type: String, 
        }
      }
    ],
    name: {
      type: String,
      required: true,
    }
  }, { timestamps: true });
  

const Chat = new mongoose.model('Chat', chatSchema);

module.exports = Chat;