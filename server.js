import dotenv from "dotenv";
 dotenv.config()

 import express from "express";
 import cors from "cors";
 import  connectedDB  from "./config/db.js";
 import  errorHandler  from "./middlewares/error.js";
 const app = express();

 import userRouter from "./routes/userRoute.js"
 import categoryRoute from './routes/catgeoryRoute.js'
 import productRoute from './routes/productRoute.js'
 import orderRoute from  './routes/orderRoute.js'


 const port = process.env.PORT;

 //middlewares
 app.use(express.json())
 app.use(cors())

 //database connected
 connectedDB()

 //user api
 app.use("/api/v1", userRouter)
 app.use("/api/v1", categoryRoute)
 app.use("/api/v1",productRoute)
 app.use("/api/v1",orderRoute)

 //errorHandler
 app.use(errorHandler)
 app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
 })