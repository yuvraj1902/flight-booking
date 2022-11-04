const express = require('express')
const router = express.Router()
const { createBookings, getBookings, deleteBookings } = require("../controllers/booking.controller")
const isSignedIn = require("../middlewares/isSignedIn")

router.post("/booking", isSignedIn, createBookings)

router.get("/booking", isSignedIn, getBookings)

router.delete("/booking", isSignedIn, deleteBookings)



module.exports = router