import express from "express";
import Admin from "../models/admin.model.js";
import Question from "../models/question.model.js";

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const data = await Admin.find().lean().exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

// router.get("/:id", async (req, res) => {
//   let query = req.query.q;
//   let ans = req.query.ans;
//   console.log(query);
//   if (query) {
//     const data = await Admin.findById(req.params.id).lean().exec();
//     let ans = data.answer;
  
//     if (ans == query) {
//       return res.send("correct");
//     } else {
//       return res.send("wrong");
//     }
  
//   } else if (ans) {
//     const data = await Question.find().lean().exec();
//     const single = await Admin.findById(req.params.id).lean().exec();

//     let difficulty = single.difficulty;
//     let questionToSend = await Question.find({
//       difficulty: Number(difficulty) + 1,
//     })
//       .lean()
//       .exec();
//     return res.send(questionToSend);
//   } else {
//     try {
//       console.log("heere ", req.params.id);
//       const data = await Admin.findById(req.params.id).lean().exec();
//       res.send(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });

export default router;
