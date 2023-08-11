import express from "express";
import { User } from "../models/user.js"
import Joi from "joi";
import bcrypt from "bcrypt";

const router = express.Router();
router.post("/",async(req,res) =>{
    try{
        const{ error} = validate(req.body);

        if(error)
         return res.status(400).send({message:error.details[0].message});
         
         const user = await User.findOne({email:req.body.email});

         if(!user)
          return res.status(401).send({message:"Invalid Email and password"});

        const validpassword = await bcrypt.compare(
            req.body.password ,user.password
        );

        if(!validpassword)
            return res.status(401).send({message:"Invalid Email or password"});

            const token = user.generateAuthToken();
            res.status(200).send({data:token,message:"Logged in successfully"})
    }catch(error){
            res.status(500).send({message:"internal server error"})
    }
})

const validate = (data) =>{
    const schema = Joi.object({
        email:Joi.string().email().required.label("Email"),
        password:Joi.string().required().label("Password")
    });

    return schema.validate(data);
}


export default router;