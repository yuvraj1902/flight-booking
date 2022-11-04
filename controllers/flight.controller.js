const { createFlight, getFlight, deleteFlight } = require("../services/flight.service")

const db = require("../connection")


const createFlights = (req, res) => {
    createFlight(req.body, (err, result, resp) => {
        if (err) return res.status(resp).json({ error: err })
        else return res.status(resp).json({
            message: result
        })
    })
}

const getFlights = (req, res) => {
    getFlight((err, result, resp) => {
        if (err) return res.status(resp).json({
            error: err
        })
        return res.status(resp).json(result)
    })
}


const deleteFlights = (req, res) => {
    deleteFlight(req.query, (err, result, resp) => {
        if (err) return res.status(resp).json({
            error: err
        })
        return res.status(resp).json(result)
    })
}



module.exports = { createFlights, getFlights, deleteFlights }