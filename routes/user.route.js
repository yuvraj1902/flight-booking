const express=require('express')
const router=express.Router()
const {createUsers,getUsers, checkUsers}=require("../controllers/user.controller")
const isSignedIn=require("../middlewares/isSignedIn")
const isAdmin=require("../middlewares/isAdmin")
router.post("/signup",createUsers)

router.post("/login",checkUsers)

router.get("/users",isSignedIn,getUsers)



module.exports=router