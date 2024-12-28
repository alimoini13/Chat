import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    unique: true, required: true 
  },
  username: { type: String, required: true  },
  password: {
    type: String, required: true
  },
  friends: [{ type: mongoose.Schema.Types.Object, ref: 'User' }],
});
const User = mongoose.model('User', userSchema);

export default User;
