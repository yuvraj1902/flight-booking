const express = require('express')
const { body, validationResult } = require('express-validator');
const validation=require('../helper/validation')
const router = express.Router()
const { createBookings, getBookings, deleteBookings } = require("../controllers/booking.controller")
const isSignedIn = require("../middlewares/isSignedIn")

router.post("/booking",[
    body('noOfSeat',' Number of seats in flight must be greater than 2 digit and less than or equal to 4').isLength({min:2,max:4}).isNumeric(),
    body('startTime','Departure time of the flight must be in  [YYYY-MM-DD HH:MM:SS] this format').isString().isISO8601().toDate().withMessage("Invalid date-time format"),
    body('endTime','Arrival time of the flight must be in  [YYYY-MM-DD HH:MM:SS] this format').isString().isISO8601().toDate().withMessage("Invalid date-time format"),
    body('flightId',' Flight Id must be in numeric format').isNumeric(),
    body('couponId',' Coupon Id must be in numeric format').isNumeric()
],validation, isSignedIn, createBookings)

router.get("/booking", isSignedIn, getBookings)

router.delete("/booking", isSignedIn, deleteBookings)

module.exports = router