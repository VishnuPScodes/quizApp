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
      console.log(1);
      const errors = validationResult(req);
      console.log(2);
      //if the 'errors' is not empty ,we will return an error 
      if (!errors.isEmpty()) {
        console.log(3);
        res.status(404).send({ message: errors.array() });
      } else {
        console.log(4);
      //if there is no errors,we will check for a user ,from the email id provided.  
        const regData = await Reg.findOne({ email: req.body.email });  
        console.log(5);
        if (!regData) {
          res.status(400).send("Email or password is wrong");
        } else {
      //if the user is found using the email id ,then we will check weather the hashed passwords are equal 
      console.log(6);    
          const match = regData.checkPassword(req.body.password);
          console.log(match);
      //if not equal it will return false and we will send error    
          if (!match) {
            res.status(400).send("Email or password is wrong");
          } else {
            console.log(7);
       //if it is true ,that means given password and the registered passwords matches=>so send jwt as response to the front-end    
            const token = newToken(regData);
            console.log(8);
            res.status(200).send({ token });
            console.log(9);
          }
        }
      }
    } catch (error) {
      res.status(500).send({message:error});
    }
  }
);
export default router;
