import mongoose from 'mongoose';

const HallOfFameSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  score: {
    type: Number,
  },
});

const HallOfFameModel = mongoose.model('halloffame', HallOfFameSchema);

export default HallOfFameModel;
