const express=require("express")
const dotenv = require("dotenv");
dotenv.config();
const app=express();



const PORT=process.env.PORT;
app.get('/',async(req,res)=>{
    return res.status(200).send({message:"ohk"})
})
app.get('/check',(req,res)=>{
    return res.status(200).send({message:"working everything"})
})

app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})