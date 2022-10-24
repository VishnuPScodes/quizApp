import express from "express";
import Question from "../models/question.model.js";

const router = express.Router();

//getting all the questions

router.get("", async (req, res) => {
  try {
    const questions = await Question.find().lean().exec();
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send(error);
  }
});

//posting questions in the db

router.post("/:id", async (req, res) => {
  try {
    const questions = await Question.create(req.body);
    res.send(questions);
  } catch (error) {
    res.send(error);
  }
});

//getting a single set of questions

router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findOne().lean().exec();
    res.send(question);
  } catch (error) {
    res.send(error);
  }
});

//deleting a set of questions by id

router.delete("/:id", async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    res.send(question);
  } catch (error) {
    res.send(error);
  }
});

export default router;
