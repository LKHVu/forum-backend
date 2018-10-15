import mongoose from 'mongoose';

const Schema = mongoose.Schema

const SubforumSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  description:    { type: String, required: true },
  createdAt:  Date,
  updatedAt:  Date,
  newestComment:   {type: Schema.Types.ObjectId, ref: 'Comment'},
  newestThread:    {type: Schema.Types.ObjectId, ref: 'Thread'},
});

SubforumSchema.pre('save', function(next) {
  const date = new Date();
  this.updatedAt = date;
  if ( !this.createdAt ) {
    this.createdAt = date;
  }
  next();
});

module.exports = mongoose.model('Subforum', SubforumSchema);