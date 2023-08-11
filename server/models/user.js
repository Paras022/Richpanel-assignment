import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import  JoiPasswordComplexity  from "joi-password-complexity";

const userSchema = new mongoose.Schema({
    Name :{
        type :String,
        required:true
    },
    Email:{
        type :String,
        required:true
    },
    Password :{
        type :String,
        required:true
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT,{expiresin:"7d"})
    return token
};



const validate = (data) =>{
    const schema = Joi.object({
        name:Joi.string().required().label("Name"),
        email:Joi.string().email().label("Email"),
        password:JoiPasswordComplexity().required().label("Password"),
    });

    return schema.validate(data);
};

const User = mongoose.model("user",userSchema);
export {
    User,
    validate
}

