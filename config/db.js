const mongoose=require("mongoose")
require("dotenv").config()

const connection=mongoose.connect("mongodb+srv://aiidltechnologies:aiidltechnologies@cluster0.8rgdwgh.mongodb.net/aiidltechnologies?retryWrites=true&w=majority")

module.exports={connection} 
