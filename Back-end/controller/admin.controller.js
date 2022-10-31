import express from "express";
import Admin from "../models/admin.model.js";

const router = express.Router();
//get all the questions from the database

router.get("", async (req, res) => {
  try {
    const data = await Admin.find().lean().exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

//getting a single question from the admin collection

router.get("/:id", async (req, res) => {
  try {
    const data = await Admin.findById(req.params.id).lean().exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default router;
