import mongoose  from "mongoose";

const userScheam = new  mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    street:{
        type:String,
        default:''
    },
    apartment:{
        type:String,
        default:''
        },
        city:{
            type:String,
            default:''
            },
            zip:{
                type:String,
                default:''
            },
            country:{
            type:String,
            default:''
            }

})

const userModel = mongoose.model("user", userScheam)
export default userModel;