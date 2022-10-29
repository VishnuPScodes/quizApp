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
  //validating the given data using express validator middleware
  body("password").notEmpty().isStrongPassword(),
  body("email").isEmail(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //if has error
      if (!errors.isEmpty()) {
        res.status(404).send({ message: errors.array() });
      } else {
        //if validator does not has any error
        //checking weather user already exists or not
        let regData = await Reg.findOne({ email: req.body.email });
        //if already exists =>send error to try another email
        if (regData) {
          res.status(400).send({ message: "Try another email" });
        } else {
          regData = await Reg.create(req.body);
          //creating a token 
          const token = newToken(regData);
          //sending user details and the token
          res.status(200).send({ token, regData });
        }
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
