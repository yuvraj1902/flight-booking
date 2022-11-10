const { createBooking, getBooking, deleteBooking } = require("../services/booking.service")
const db = require("../connection")

const createBookings = (req, res) => {
    createBooking(req, req.body, (err, result, resp) => {
        if (err) return res.status(resp).json({ error: err })
        else return res.status(resp).json({
            message: result
        })
    })
}

const getBookings = (req, res) => {
    getBooking((err, result, resp) => {
        if (err) return res.status(resp).json({
            error: err
        })
        return res.status(resp).json(result)
    })
}

const deleteBookings = (req, res) => {
    deleteBooking(req.query, (err, result, resp) => {
        if (err) return res.status(resp).json({
            error: err
        })
        return res.status(resp).json(result)
    })
}
module.exports = { createBookings, getBookings, deleteBookings }