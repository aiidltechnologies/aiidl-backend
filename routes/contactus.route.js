const express=require("express")
const { ContactUsModel } = require("../models/ContactusModel")
const contactusRoute=express.Router()
const nodemailer=require("nodemailer")
const Mailgen=require("mailgen")


contactusRoute.get("/",(req,res)=>{
    res.send({message:"welcome to contact us route"})
})

contactusRoute.post("/add",async(req,res)=>{
    const {last_name,first_name,email,contact,message}=req.body
    const data=await ContactUsModel.findOne({email:email})
   
    let config = {

        service : 'gmail',
        auth : {
            user:"aiidltechnologies@gmail.com",
            pass: "bizhqfuurwysdwto"
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Aiidl Technologies",
            link : 'https://aiidltechnologies.com/'
        }
    })
    //  ******Thanking Mail Sending to visitor****
    let response1 = {
        body: {
            name :first_name+" "+last_name,
            intro: "Thank you for taking the time to visit our website we will connect to you shortly",
        }
    }

    let mail1 = MailGenerator.generate(response1)

    let mailgenerate1 = {
        from : "aiidltechnologies@gmail.com",
        to : email,
        subject: "Thanking Mail From Aiidl Technologies",
        html: mail1
    }

    if(data){
        await ContactUsModel.findByIdAndUpdate({_id:data.id},{"$set":{"status":"Pending"}})
       res.send({"message":"your request is already generated we will connect you soon"})
    }
     else if(first_name && last_name && contact && message){

        const new_request=new ContactUsModel({
            first_name,
            last_name,
            contact,
            status:"Pending",
            message,
            email
            })
           
        transporter.sendMail(mailgenerate1)
        .then(async() => {
            res.send({"message1":"mail send successfully","message2":await saveData()}) 
        })
        .catch(error => {
            res.send({"message1":"mail not send successfully","message2":"data not saved successfully"}) 
           console.log(error)
        })

        const saveData=async()=>{
            
           try{
            await new_request.save()
            return "data saved successfully"
           }
           catch{(err)=>{
            console.log(err)
            return "data not saved successfully"
           }}
        }
        

    }

    else{
        res.send({"message":"Some thing went wrong please please provide all details"})
    }


})




module.exports={contactusRoute}
