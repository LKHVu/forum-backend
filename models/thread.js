import mongoose from 'mongoose';

const Schema = mongoose.Schema

const ThreadSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  content:    { type: String, required: true },
  createdAt:  Date,
  updatedAt:  Date,
  comments:   [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  author:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes:    [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  downvotes:  [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  score:  { type: Number, default: 0 },
  tags:   [String],
  subforum: { type: Schema.Types.ObjectId, ref: 'Subforum', required: true},
  views: {type: Number, default: 0},
  reported: {type: Boolean, default: false}
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