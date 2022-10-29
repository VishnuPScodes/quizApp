import express from "express";
import Reg from "../models/reg.model.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
const newToken = (regData) => {
  return jwt.sign({ regData }, process.env.JWT_SECRET_KEY);
};

const router = express.Router();

router.post(
  "/",
  //validating using express validator middleware
  body("password").notEmpty().isStrongPassword(),
  body("email").isEmail(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(404).send({ message: errors.array() });
      } else {
        let regData = await Reg.findOne({ email: req.body.email });
        if (regData) {
          res.status(400).send({ message: "Try another email" });
        } else {
          regData = await Reg.create(req.body);
          const token = newToken(regData);
          res.status(200).send({ token, regData });
        }
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
