import express from "express";
import WFF from "../models/hallofame.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await WFF.find().lean().exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(200).send(error);
  }
});

router.post("/", async (req, res) => {
  console.log("hallof fame data");

  try {
    console.log(req.body);
    const previous = await WFF.find({ name: req.body.name });
    const previousscore = +previous[0]?.score;
    const newscore=+req.body.score
    console.log("check 2");
    console.log("previous i got", previous);
    console.log('pre',previous)
    if (previous.length < 1) {
      const data = await WFF.create(req.body);
      res.status(200).send(data);
      console.log("check 3");
    } else if (previousscore < newscore) {
      const udata = await WFF.findOneAndUpdate(
        { name: req.body.name },
        { score: req.body.score }
      );
      res.status(200).send({
        message: "user score updated as its a higher value",
        data: udata,
      });
      console.log("updatation success!");
    } else {
      res.status(200).send("user already exists");
      console.log("check 4");
      console.log('previous',previousscore,'newscore',newscore);
    }
  } catch (error) {
    res.status(200).send(error);
  }
});

export default router;
