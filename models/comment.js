import mongoose from 'mongoose'

const Schema = mongoose.Schema

var CommentSchema = new mongoose.Schema({
  content:    { type: String, required: true },
  createdAt:  Date,
  updatedAt:  Date,
  author:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  thread:     { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
  upvotes:    [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  downvotes:  [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  score:  {type: Number, default: 0 },
  reported: {type: Boolean, default: false}
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