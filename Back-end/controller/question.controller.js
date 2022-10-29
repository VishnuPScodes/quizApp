import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import Question from "../models/question.model.js";

const router = express.Router();

//getting the questions
//passing the 'authenticate' function as a middleware to authenticate =>so that only if the jwt is given it will return 'true'.
router.get("", authenticate, async (req, res) => {
  try {
    const user_id = req.user._id;
    const questions = await Question.find().lean().exec();
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send(error);
  }
});

//to get a single question

router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findOne().lean().exec();
    res.send(question);
  } catch (error) {
    res.send(error);
  }
});

//to delete a question

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    res.send(question);
  } catch (error) {
    res.send(error);
  }
});

export default router;
