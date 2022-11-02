const express=require('express')
const router=express.Router()
const {createFlights,getFlights, deleteFlights}=require("../controllers/flight.controller")
const isSignedIn=require("../middlewares/isSignedIn")
const isAdmin=require("../middlewares/isAdmin")
router.post("/flights",isSignedIn,createFlights)

router.get("/flights",isSignedIn,getFlights)

router.delete("/flights",isSignedIn,deleteFlights)



module.exports=router