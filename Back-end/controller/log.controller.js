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

      //if the 'errors' is not empty ,we will return an error
      if (!errors.isEmpty()) {
        res.status(404).send({ message: errors.array() });
      } else {
        //if there is no errors,we will check for a user ,from the email id provided.
        const regData = await Reg.findOne({ email: req.body.email });

        if (!regData) {
          res.status(400).send("Email or password is wrong");
        } else {
          //if the user is found using the email id ,then we will check weather the hashed passwords are equal

          const match = regData.checkPassword(req.body.password);

          //if not equal it will return false and we will send error
          if (!match) {
            res.status(400).send("Email or password is wrong");
          } else {
            //if it is true ,that means given password and the registered passwords matches=>so send jwt as response to the front-end
            const token = newToken(regData);

            res.status(200).send({ token,data:regData });
          }
        }
      }
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }
);
export default router;
