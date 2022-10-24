import mongoose from "mongoose";

const regSchema = mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Reg = mongoose.model("reg", regSchema);

export default Reg;
