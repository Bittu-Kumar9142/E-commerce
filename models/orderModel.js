import mongoose  from "mongoose";
const orderSchema = mongoose.Schema({
orderItems:[{
type:mongoose.Schema.Types.ObjectId,
ref:"order-Items",
required:true
}],
shippingAddress1:{
    type:String,
    required:true
},
shippingAddress2:{
    type:String
},
city:{
    type:String,
    required:true
},
zip:{
    type:String,
    required:true
},
country:{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true
},
status:{
    type:String,
    required:true,
    default:"pending"
},
totalPrice:{
    type:Number
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
dateOrdered:{
    type:Date,
    default:Date.now
}
})

const orderModel = mongoose.model("order", orderSchema)
export default orderModel