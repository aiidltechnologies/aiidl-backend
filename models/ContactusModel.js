const { timeStamp } = require("console")
const mongoose=require("mongoose")


const ContactUsSchemia=new mongoose.Schema({
    "first_name":{type:String,required:true},
    "last_name":{type:String,required:true},
    "email":{type:String,required:true},
    "contact":{type:String,required:true},
    "message":{type:String,required:true},
    "status":{type:String},
},{
    timeStamp:true
})

const ContactUsModel=mongoose.model("contactus",ContactUsSchemia)

module.exports={ContactUsModel}