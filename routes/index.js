const express = require("express");
const router=express.Router();
const {userLogin,Signup,GenerateQuestion}=require("../controllers/user.controller")


router.post('/login',userLogin)
router.post('/signup',Signup)
router.get('/question',GenerateQuestion)

module.exports=router;