import express from "express";
import Reg from "../models/reg.model.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/",
  //validating using express validator middleware
  body("password").notEmpty().isStrongPassword(),
  body("email").isEmail(),
  async (req, res) => {
    try {
      const regData = await Reg.create(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(404).send({ message: errors.array() });
      } else {
        res.status(200).send(regData);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
