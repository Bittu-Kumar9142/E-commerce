import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
name:{
    type:String,
    required:true
},
color:{
    type:String
},
icon:{
    type:String
},

})

const categoryModel = mongoose.model("category", categorySchema)

export default categoryModel