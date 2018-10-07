import Mongoose from 'mongoose'

const UserSchema = new Mongoose.Schema({
    userID: String,
    name: { 
        type: String, 
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    avatar: String,
    password: {
        type: String,
        required: true,
    },
    friends: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    conversations: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    }]
})

module.exports = Mongoose.model('User', UserSchema)