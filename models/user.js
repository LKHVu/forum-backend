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

module.exports = Mongoose.model('User', UserSchema)