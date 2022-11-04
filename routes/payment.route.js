const express = require('express')
const router = express.Router()
const { createPayments, getPayments, deletePayments } = require("../controllers/payment.controller")
const isSignedIn = require("../middlewares/isSignedIn")

router.post("/payment", isSignedIn, createPayments)

router.get("/payment", isSignedIn, getPayments)

router.delete("/payment", isSignedIn, deletePayments)



module.exports = router