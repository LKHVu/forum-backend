import mongoose from 'mongoose';

const Schema = mongoose.Schema

const ThreadSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  content:    { type: String, required: true },
  createdAt:  Date,
  updatedAt:  Date,
  category:   { type: String, required: true },
  comments:   [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  author:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes:    [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  downvotes:  [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  score:  { type: Number, default: 0 },
  bikeType:   String
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