import Mongoose from 'mongoose'

const ConversationSchema = Mongoose.Schema({
    userOneId: String,
    userTwoId: String,
    messages: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
})

module.exports = Mongoose.model('Conversation', ConversationSchema)