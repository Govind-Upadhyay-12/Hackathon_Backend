const express=require("express")
const dotenv = require("dotenv");
dotenv.config();
const app=express();



const PORT=process.env.PORT;

app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})