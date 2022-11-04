const express = require('express')
const router = express.Router()
const { createRoutes, getRoutes, deleteRoutes } = require("../controllers/routes.controller")
const isSignedIn = require("../middlewares/isSignedIn")
const isAdmin = require("../middlewares/isAdmin")
router.post("/routes", isSignedIn, isAdmin, createRoutes)

router.get("/routes", isSignedIn, getRoutes)

router.delete("/routes", isSignedIn, isAdmin, deleteRoutes)



module.exports = router