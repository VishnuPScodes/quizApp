import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const liveQuestionSchema = new mongoose.Schema({
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
//hashing the answer to hide from the user

liveQuestionSchema.pre('save', function (next) {
  var hash = bcrypt.hashSync(this.answer, 2);
  this.answer = hash;
  return next();
});

//matching the given answer with the real answer
liveQuestionSchema.methods.checkAnswer = function (answer) {
  return bcrypt.compareSync(answer, this.answer); // returns either true or false
};

const LiveQuestionModel = mongoose.model('livequestion', liveQuestionSchema);

export default LiveQuestionModel;
