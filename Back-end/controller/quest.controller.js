import express from "express";
import Quest from "../models/quest.model.js";
import bcrypt from "bcryptjs";
const router = express.Router();

//trying to get all the questions in the questionbank cluster

router.get("", async (req, res) => {
  try {
    const data = await Quest.find().lean().exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

//posting questions from the admin page to the user ,so that user can access it on the quiz page

router.post("", async (req, res) => {
  try {
    const data = await Quest.create(req.body);
    res.send("posted");
  } catch (error) {
    res.send(error);
  }
});

//checking weather answer is correct or not
//if correct =>send the question with the greater difficulty level
//if wrong => send the question with the lesser difficulty level

router.post("/:id", async (req, res) => {
  let ans = req.query.q;

  const data = await Quest.findById(req.params.id).lean().exec();
  //comparing the answer(hashed) and the user provided answer =>this will return either true or false
  if (bcrypt.compareSync(ans, data?.answer)) {
    //if the answer is correct
    const single = await Quest.findById(req.params.id).lean().exec();
    //getting the difficulty level of the current question

    let difficulty = single?.difficulty;
    //getting the question with the greater difficulty

    let questionToSend = await Quest.findOne({
      $or: [
        { difficulty: Number(difficulty) + 1 },
        { difficulty: { $gt: Number(difficulty) } },
      ],
    })
      .lean()
      .exec();

    return res.send(questionToSend);
    //if answer provided is wrong
  } else {
    const single = await Quest.findById(req.params.id).lean().exec();
    //getting the difficulty level of current question

    let difficulty = single?.difficulty;
    //getting the question with the lesser difficulty than the current one

    let questionToSend = await Quest.findOne({
      $or: [
        { difficulty: Number(difficulty) - 1 },
        { difficulty: { $lt: Number(difficulty) } },
      ],
    })
      .lean()
      .exec();
    //sending the lesser difficulty level question to the front end

    return res.send(questionToSend);
  }
});

//getting a single question from the questionbank collection

router.get("/:id", async (req, res) => {
  try {
    //getting the question of given id
    const data = await Quest.findById(req.params.id).lean().exec();
    if (data == null) {
      res.send(false);
    } else {
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
});

//removing all the questions from  question bank

router.delete("", async (req, res) => {
  try {
    const data = await Quest.remove();
    res.send("removed");
  } catch (error) {
    console.log(error);
  }
});

export default router;
