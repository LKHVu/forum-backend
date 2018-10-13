import mongoose from 'mongoose'

const Schema = mongoose.Schema

var CommentSchema = new mongoose.Schema({
  content:    { type: String, required: true },
  createdAt:  Date,
  updatedAt:  Date,
  comments:   [ {type: Schema.Types.ObjectId, ref: 'Comment', required: false}], 
  author:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: false },
  threadId:     { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
});

CommentSchema.pre('save', function(next) {
  const date = new Date();
  this.updatedAt = date;
  if ( !this.createdAt ) {
    this.createdAt = date;
  }
  next();
});

module.exports = mongoose.model('Comment', CommentSchema);