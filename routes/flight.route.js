const express = require('express')
const { body, validationResult } = require('express-validator');
const validation=require('../helper/validation')
const router = express.Router()
const { createFlights, getFlights, deleteFlights } = require("../controllers/flight.controller")
const isSignedIn = require("../middlewares/isSignedIn")
const isAdmin = require("../middlewares/isAdmin")
router.post("/flights",[
    body('name','flight company name must be greater than 4 characters').isLength({min:4}).isString(),
    body('flightPrice','ticket price should be of at least 4 digits and at most of 6 digits ').isLength({min:4,max:6}).isNumeric(),
    body('status','status either be Empty or Full ').isLength({min:3,max:5}).isString(),
    body('capacity','capacity should be at least of 3 characters, at most of 4 characters and is in number format').isLength({ min: 3 ,max:4 }).isNumeric()
],validation, isSignedIn, isAdmin, createFlights)

router.get("/flights", isSignedIn, getFlights)

router.delete("/flights", isSignedIn, isAdmin, deleteFlights)

module.exports = router