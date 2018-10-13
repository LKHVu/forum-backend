import mongoose from 'mongoose';
import Comment from './comment'

const Schema = mongoose.Schema

const ThreadSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  content:    { type: String, required: true },
  createdAt:  Date,
  updatedAt:  Date,
  category:   { type: String, required: true },
  comments:   [Comment.schema],
  author:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upVotes:    [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  downVotes:  [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  voteTotal:  { type: Number, default: 0 }
});

ThreadSchema.pre('save', function(next) {
  const date = new Date();
  this.updatedAt = date;
  if ( !this.createdAt ) {
    this.createdAt = date;
  }
  next();
});

module.exports = mongoose.model('Thread', ThreadSchema);