const express = require('express')
const router = express.Router()
const { createCoupons, getCoupons, deleteCoupons } = require("../controllers/coupon.controller")
const isSignedIn = require("../middlewares/isSignedIn")
const isAdmin = require("../middlewares/isAdmin")
router.post("/coupons", isSignedIn, isAdmin, createCoupons)

router.get("/coupons", isSignedIn, getCoupons)

router.delete("/coupons", isSignedIn, isAdmin, deleteCoupons)



module.exports = router