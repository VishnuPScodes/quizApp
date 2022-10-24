import express from 'express';
import connect from './configs/db.js';
import regController from './controller/reg.controller.js'
const app=express();
app.use(express.json());

app.use('/reg',regController)
app.listen(5000,async (req,res)=>{
    try {
        await connect()
        console.log('listening to the port 5000')
    } catch (error) {
        console.log(error);
    }
})