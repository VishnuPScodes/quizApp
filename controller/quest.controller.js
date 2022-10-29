import express from "express";

import Quest from "../models/quest.model.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const data = await Quest.find().lean().exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
});
//posting questions from the admin page to the user
router.post("", async (req, res) => {
  try {
    const data = await Quest.create(req.body);

    res.send("posted");
  } catch (error) {
    res.send(error);
  }
});

router.post("/:id", async (req, res) => {
  let query = req.query.q;
  let ans = req.query.q;

  if (query) {
    const data = await Quest.findById(req.params.id).lean().exec();

    if (bcrypt.compareSync(ans, data.answer)) {
      const single = await Quest.findById(req.params.id).lean().exec();

      let difficulty = single.difficulty;
      let questionToSend = await Quest.findOne({
        $or: [
          { difficulty: Number(difficulty) + 1 },
          { difficulty: { $gt: Number(difficulty) } },
        ],
      })
        .lean()
        .exec();

      return res.send(questionToSend);
    } else {
      const single = await Quest.findById(req.params.id).lean().exec();
    
      let difficulty = single?.difficulty;
      let questionToSend = await Quest.findOne({
        $or: [
          { difficulty: Number(difficulty) - 1 },
          { difficulty: { $lt: Number(difficulty) } },
        ],
      })
        .lean()
        .exec();

      return res.send(questionToSend);
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Quest.findById(req.params.id).lean().exec();
    if (data == null) {
      res.send("error");
    } else {
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("", async (req, res) => {
  try {
    const data = await Quest.remove();
    res.send("removed");
  } catch (error) {
    console.log(error);
  }
});

export default router;
