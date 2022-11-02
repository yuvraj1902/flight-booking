const express=require('express')
const db = require('./connection')
const app=express()
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')

dotenv.config()
const routeRouter=require("./routes/routes.route")
const userRouter=require("./routes/user.route")
const flightRouter=require("./routes/flight.route")
const couponRouter=require("./routes/coupon.route")
const routeFlightRouter=require("./routes/routeFlight.route")
db.connect((err)=>{
    if(err) return err
    else{
        console.log("Db connected");
        console.log("Lets Go");
    }
})
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use("/api",userRouter)
app.use("/api",routeRouter)
app.use("/api",flightRouter)
app.use("/api",couponRouter)
app.use("/api",routeFlightRouter)
const PORT=process.env.port
app.listen(PORT,()=>{
    console.log(`Port is listening on ${PORT}`);
})