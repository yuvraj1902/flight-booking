const routeFlight = require("../services/routeFlight.service")

const routeFlights = (req, res) => {
    routeFlight(req.body, (err, result, resp) => {
        if (err) return res.status(resp).json({ error: err })
        else return res.status(resp).json({
            message: result
        })
    })
}
module.exports = routeFlights