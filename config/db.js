import mongoose from "mongoose"

 const connectedDB = async(req, res, next) =>{
try {
await mongoose.connect(process.env.DATABASE_URL )
console.log("mongoDB TO connected")
} catch (error) {
   next(error) 
}
} 

export default connectedDB;