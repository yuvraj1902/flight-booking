const { createPayment, getPayment, deletePayment } = require("../services/payment.service")

const db = require("../connection")


const createPayments = (req, res) => {
    createPayment(req.body, (err, result, resp) => {
        if (err) return res.status(resp).json({ error: err })
        else return res.status(resp).json({
            message: result
        })
    })
}

const getPayments = (req, res) => {
    getPayment((err, result, resp) => {
        if (err) return res.status(resp).json({
            error: err
        })
        return res.status(resp).json(result)
    })
}


const deletePayments = (req, res) => {
    deletePayment(req.query, (err, result, resp) => {
        if (err) return res.status(resp).json({
            error: err
        })
        return res.status(resp).json(result)
    })
}



module.exports = { createPayments, getPayments, deletePayments }