import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }
})

const orderItem = mongoose.model("order-Items", orderItemSchema)
export default orderItem