import express from "express";
import connect from "./configs/db.js";
import dotenv from "dotenv";
import regController from "./controller/reg.controller.js";
import logController from "./controller/log.controller.js";
import queController from "./controller/question.controller.js";
import adminController from "./controller/admin.controller.js";
import questBankController from "./controller/quest.controller.js";
import cors from "cors";

const app = express();
dotenv.config();
//converting to json formate
app.use(express.json());
//prevent the cors errors

app.use(cors());
//making different routes for various api end points

app.use("/questbank", questBankController);
app.use("/reg", regController);
app.use("/log", logController);
app.use("/question", queController);
app.use("/admin", adminController);
const PORT = process.env.PORT;
app.listen(PORT, async (req, res) => {
  try {
    await connect();
    console.log("listening to the port " + PORT);
  } catch (error) {
    console.log(error);
  }
});
