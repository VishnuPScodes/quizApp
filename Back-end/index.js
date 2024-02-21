import express from 'express';
import connect from './configs/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import regController from './controller/reg.controller.js';
// import logController from './controller/log.controller.js';
// import queController from './controller/question.controller.js';
// import adminController from './controller/admin.controller.js';
// import questBankController from './controller/quest.controller.js';
// import hallofameController from './controller/hallofame.controller.js';
import authRouter from './src/routes/auth/auth.routes.js';
import cors from 'cors';
import questionRouter from './src/routes/questions.routes.js';
import hallOfFameRouter from './src/routes/hallOfFame.routes.js';

const app = express();
dotenv.config();
//converting to json formate
app.use(express.json());
//prevent the cors errors

app.use(cors());
//making different routes for various api end points

// app.use("/questbank", questBankController);
// app.use("/reg", regController);
// app.use("/log", logController);
// app.use("/question", queController);
// app.use("/admin", adminController);
// app.use('/hallofame', hallofameController);
app.use('/auth', authRouter);
app.use('/quiz', questionRouter);
app.use('/halloffame', hallOfFameRouter);

const PORT = process.env.PORT;
app.listen(PORT, async (req, res) => {
  try {
    console.log('here');
    await mongoose.connect(process.env.URL);
    console.log('listening to the port ' + PORT);
  } catch (error) {
    console.log(error);
  }
});
