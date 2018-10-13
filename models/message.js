import Mongoose from 'mongoose'

const MessageSchema = new Mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: Object,
  createdAt: Date,
  updatedAt: Date,
});

MessageSchema.pre('save', function(next) {
  const date = new Date();
  this.updatedAt = date;
  if ( !this.createdAt ) {
    this.createdAt = date;
  }
  next();
});

module.exports = Mongoose.model('Message', MessageSchema);