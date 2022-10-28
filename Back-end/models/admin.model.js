import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  singleQuestion: { type: [String], required: false },
  MoreThanOne: { type: [String], required: false },
});

const Admin = mongoose.model("admin", adminSchema);
export default Admin;
