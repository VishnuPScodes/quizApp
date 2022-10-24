import express from "express";
import Reg from "../models/reg.model.js";
import { body, validationResult } from 'express-validator'

const router=express.Router();


router.post("/",
//middlewares to validate the data from the front end
body("password").notEmpty().isStrongPassword(),
body("email").isEmail()

,async (req,res)=>{
    try {
        const regData=await Reg.findOne({email:req.body.email});
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            res.status(404).send({message:errors.array()})
        }
        else{         
            if(regData){              
                if(req.body.password==regData.password){
                       console.log(req.body.password,regData.password);
                        res.send("login successful")                    
                }
                else{
                    console.log(req.body.password,regData.password);
                    res.send("password is incorect")
                }                                
            }
            else{
                res.send("email not registered yet");
            }          
        }      
    } catch (error) {
        res.status(500).send(error)
    }
})
export default router