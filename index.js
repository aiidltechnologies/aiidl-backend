const express=require("express")
const { connection } = require("./config/db")
const cors=require("cors")
const { contactusRoute } = require("./routes/contactus.route")
const { userRoute } = require("./routes/user.route")

const app=express()

// *****Middleware*****

app.use(express.json())
app.use(cors())


// *****home route to check connection working status*****
app.get("/",(req,res)=>{
    res.send({"mesg":"Welcome to accountings zone"})
})





// *****RoutesConnections****

app.use("/contactus",contactusRoute)
app.use("/user",userRoute)








app.listen(8080,async()=>{
    await connection
    try{
           console.log("connected to port 8080")
           console.log("connected to database")
    }
    catch{(e)=>{
        console.log(e)
    }}
})