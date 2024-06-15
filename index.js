const express=require("express")
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors=require("cors")
const router=require("./routes/index")
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());




const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL

app.use('/api/v1',router)
app.get('/',async(req,res)=>{
    return res.status(200).send({message:"ohk"})
})
app.get('/check',(req,res)=>{
    return res.status(200).send({message:"working everything"})
})

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('DB connected');
})
.catch((err)=>{
    console.log(`Error connecting to DB: ${err}`);
})

app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})