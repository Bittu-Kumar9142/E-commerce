import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const user_sinup = async(req,res, next) =>{
    try {
     
     const {name, email,  password,  phone,  isAdmin, street,apartment,city, zip,country
     } = req.body

     const salt = await bcrypt.genSalt(10)
     const hashPassword = await bcrypt.hashSync(password,salt)
 
     const newUser = new userModel({
        name, email,  password:hashPassword,  phone,  isAdmin, street,apartment,city, zip,country
     })
     const saveUser = await newUser.save()
     res.status(201).json({
         message:"user sing-up successfully...",
         success:true,
         user:saveUser
     })
 
 } catch (error) {
     next(error)
    }
 }

 export const longin = async(req,res,next) =>{
    try {
      const {email, password} = req.body
      const existUser = await userModel.findOne({email})
      if(!existUser){
        res.status(404).json({message:"no found user"})
      }
      const comparePassword = await bcrypt.compare(password, existUser.password);
       if(!comparePassword){
        res.status(404).json({message:"incorrect password && email"})
       }
       const token = await jwt.sign({id:existUser._id}, "secert_key",{expiresIn: '7d'})
       res.status(200).json({message:"longin successfully...",
       token:token,
       existUser
       })

    } catch (error) {
       next(error) 
    }
 }

