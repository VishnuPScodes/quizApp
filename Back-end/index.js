import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth/auth.routes.js";
import cors from "cors";
import questionRouter from "./src/routes/questions.routes.js";
import hallOfFameRouter from "./src/routes/hallOfFame.routes.js";
import asyncHandler from "./src/utils/asyncHandler.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
//converting to json formate
app.use(cookieParser());
app.use(
  cors({
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json());
//prevent the cors errors

app.use(cors());
app.use("/auth", authRouter);
app.use("/quiz", questionRouter);
app.use("/halloffame", hallOfFameRouter);
app.use(asyncHandler);
const PORT = process.env.PORT;
app.listen(PORT, async (req, res) => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("listening to the port " + PORT);
  } catch (error) {
    console.log(error);
  }
});
