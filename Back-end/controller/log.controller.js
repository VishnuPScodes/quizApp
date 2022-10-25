import express from "express";
import Reg from "../models/reg.model.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const router = express.Router();

router.post(
  "/",
  //middlewares to validate the data from the front end
  body("password").notEmpty().isStrongPassword(),
  body("email").isEmail(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(404).send({ message: errors.array() });
      } else {
        const regData = await Reg.findOne({ email: req.body.email });
        if (!regData) {
          res.status(400).send("Email or password is wrong");
        } else {
          const match = regData.checkPassword(req.body.password);
          console.log(match);
          if (!match) {
            res.status(400).send("Email or password is wrong");
          } else {
            const token = newToken(regData);
            res.status(200).send({ token });
          }
        }
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
export default router;
