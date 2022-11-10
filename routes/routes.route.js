const express = require('express')
const { body, validationResult } = require('express-validator');
const validation=require('../helper/validation')
const router = express.Router()
const { createRoutes, getRoutes, deleteRoutes } = require("../controllers/routes.controller")
const isSignedIn = require("../middlewares/isSignedIn")
const isAdmin = require("../middlewares/isAdmin")
router.post("/routes",[
    body('source','source must be greater than 4 characters').isLength({min:4}).isString(),
    body('destination','destination should be of at least 5 characters and at most of 20 characters ').isLength({min:5,max:20}).isString(),
    body('distance','distance should be at least of 2 digits and is in number format').isLength({ min: 2 }).isNumeric()
],validation, isSignedIn, isAdmin, createRoutes)

router.get("/routes",isSignedIn, getRoutes)

router.delete("/routes", isSignedIn, isAdmin, deleteRoutes)

module.exports = router