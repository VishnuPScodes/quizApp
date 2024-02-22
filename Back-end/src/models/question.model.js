import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const questionSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
});

questionSchema.pre('save', function (next) {
  var hash = bcrypt.hashSync(this.answer, 2);
  this.answer = hash;
  return next();
});

//matching the given answer with the real answer
questionSchema.methods.checkAnswer = function (answer) {
  return bcrypt.compareSync(answer, this.answer); // returns either true or false
};

const QuestionModel = mongoose.model('question', questionSchema);

export default QuestionModel;
