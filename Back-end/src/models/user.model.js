import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: null,
  },
  totalgamesplayed: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: Number,
  },
});

//hashing to protect the passwords
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  } else {
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;

    return next();
  }
});

userSchema.methods.checkPassword = function (password) {
  console.log('herererere inside ');
  return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model('user', userSchema);

export default userModel;
