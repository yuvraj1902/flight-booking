const express=require('express')
const db = require('./connection')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
//const userRouter=require("./routes/user.router")
db.connect((err)=>{
    if(err) return err
    else{
        console.log("Db connected");
        console.log("Lets Go");
    }
})
app.use(express.json())
//app.use("/api",userRouter)
const PORT=process.env.port
app.listen(PORT,()=>{
    console.log(`Port is listening on ${PORT}`);
})