const express = require('express')
const { body, validationResult } = require('express-validator');
const validation=require('../helper/validation')
const router = express.Router()
const { createUsers, getUsers, checkUsers } = require("../controllers/user.controller")
const isSignedIn = require("../middlewares/isSignedIn")
const isAdmin = require("../middlewares/isAdmin")
router.post("/signup",[
    body('name','name must be greater than 3 characters').isLength({min:3}).isString(),
    body('contactNo','phone number should be of 10 charcters').isLength({min:10,max:10}).isString(),
    body('email','email is not in the correct format').isEmail().isString(),
    body('password','password should be at least of 3 characters minimum').isLength({ min: 3 }).isString()
],validation, createUsers)

router.post("/login", [
    body('email','email is not in the correct format').isEmail().isString(),
    body('password','password should be at least of 3 characters minimum').isLength({ min: 3 }).isString()
],validation,checkUsers)

router.get("/users", isSignedIn, isAdmin, getUsers)

module.exports = router