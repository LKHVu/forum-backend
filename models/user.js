import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false,
    },
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    conversations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    }],
    createdAt: Date,
    updatedAt: Date,  
})

UserSchema.pre('save', function(next) {
    const date = new Date();
    this.updatedAt = date;
    if ( !this.createdAt ) {
      this.createdAt = date;
    }
    next();
  });  

module.exports = mongoose.model('User', UserSchema)