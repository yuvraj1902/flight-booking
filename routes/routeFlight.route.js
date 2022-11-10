const express = require('express')
const router = express.Router()
const routeFlights = require("../controllers/routeFlight.controller")
const isSignedIn = require("../middlewares/isSignedIn")
const isAdmin = require("../middlewares/isAdmin")

router.get("/sflights", isSignedIn, routeFlights)

module.exports = router