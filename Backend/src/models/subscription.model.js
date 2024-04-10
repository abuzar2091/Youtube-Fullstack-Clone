const mongoose=require("mongoose");
const {Schema}=require("mongoose");


const subscriptionSchema=new mongoose.Schema({
       subscriber:{
        type:Schema.Types.ObjectId,
        ref:"User",
       },
       channel:{
        type:Schema.Types.ObjectId,
        ref:"User",
       }
},{timestamps:true});

const Subscription=mongoose.model("Subcription",subscriptionSchema);
module.exports=Subscription;