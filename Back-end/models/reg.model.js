import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const regSchema = mongoose.Schema({
  password: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
  totalgamesplayed: { type: Number, default: 0 },
  email: { type: String, required: true, unique: true },
  time: { type: Number },
});

//hashing to protect the passwords

regSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
   
    return next();
  }
});

regSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const Reg = mongoose.model("reg", regSchema);

export default Reg;
