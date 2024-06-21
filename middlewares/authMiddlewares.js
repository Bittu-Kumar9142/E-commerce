import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
 
  export const auth = async (req,res,next) =>{
    try {
        const token = req.headers["authorization"].split(" ")[1];
        if(!token){
          return res.status(404).json({message:"no token"})
        }
        const decoded = jwt.verify(token,"secert_key")
        req.user = await userModel.findById(decoded.id)
        next()
    } catch (error) {
       next(error) 
    }
}
