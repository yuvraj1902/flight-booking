const express = require('express')
const { body, validationResult } = require('express-validator');
const validation=require('../helper/validation')
const router = express.Router()
const { createPayments, getPayments, deletePayments } = require("../controllers/payment.controller")
const isSignedIn = require("../middlewares/isSignedIn")

router.post("/payment",[
    body('price',' Payment price  must be greater than 3 digit and less than or equal to 6').isLength({min:3,max:6}).isNumeric(),
    body('mode','Payment mode should be of at least 5 characters and at most of 20 charcters').isLength({min:5,max:20}).isString(),
    body('bookingId',' Booking Id must be in numeric format').isNumeric()
],validation, isSignedIn, createPayments)

router.get("/payment", isSignedIn, getPayments)

router.delete("/payment", isSignedIn, deletePayments)

module.exports = router