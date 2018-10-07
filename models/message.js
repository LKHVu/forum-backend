import Mongoose from 'mongoose'

const MessageSchema = new Mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: Object,
});

module.exports = Mongoose.model('Message', MessageSchema);