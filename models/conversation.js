import Mongoose from 'mongoose'

const ConversationSchema = Mongoose.Schema({
    userOneId: String,
    userTwoId: String,
    messages: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    createdAt: Date,
    updatedAt: Date,  
})

ConversationSchema.pre('save', function(next) {
    const date = new Date();
    this.updatedAt = date;
    if ( !this.createdAt ) {
      this.createdAt = date;
    }
    next();
  });  

module.exports = Mongoose.model('Conversation', ConversationSchema)