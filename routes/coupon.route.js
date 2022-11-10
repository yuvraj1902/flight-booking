const express = require('express')
const { body, validationResult } = require('express-validator');
const validation=require('../helper/validation')
const router = express.Router()
const { createCoupons, getCoupons, deleteCoupons } = require("../controllers/coupon.controller")
const isSignedIn = require("../middlewares/isSignedIn")
const isAdmin = require("../middlewares/isAdmin")
router.post("/coupons",[
    body('code','name code must be greater than 4 characters and less than or equal to 8 characters').isLength({min:4,max:8}).isString(),
    body('discountPercentage','Discount Percentage should be of at least 1 digits and at most of 3 digits').isLength({min:1,max:3}).isNumeric()
],validation, isSignedIn, isAdmin, createCoupons)

router.get("/coupons", isSignedIn, getCoupons)

router.delete("/coupons", isSignedIn, isAdmin, deleteCoupons)

module.exports = router