import mongoose from "mongoose";

const regSchema = mongoose.Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option3: { type: String, required: true },
  answer: { type: String, required: true },
  difficulty: { type: Number, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reg",
    required: false,
  },
});

const Question = mongoose.model("question", regSchema);

export default Question;
