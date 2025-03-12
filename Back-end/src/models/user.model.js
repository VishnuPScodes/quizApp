import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
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
    default: 0,
  },
  totalgamesplayed: {
    type: Number,
    default: 0,
  },
  refreshTokens: {
    type: [refreshTokenSchema],
    default: [],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bestTime: {
    type: Number,
    default: null,
  },
});

//hashing to protect the passwords
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;

    return next();
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
