import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const questSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  answer: { type: String, required: true },
  difficulty: { type: Number, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reg",
    required: false,
  },
});

questSchema.pre("save", function (next) {
  console.log("yes exct");
  var hash = bcrypt.hashSync(this.answer, 2);
  this.answer = hash;
  return next();
});
questSchema.methods.checkAnswer = function (answer) {
  return bcrypt.compareSync(answer, this.answer);
};

const Quest = mongoose.model("quesbank", questSchema);

export default Quest;