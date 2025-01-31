import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  //should be encrypted by jwt
  content: { type: String },
  date: { type: Date },
  type: { type: String },
  file:{type:Boolean}
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
