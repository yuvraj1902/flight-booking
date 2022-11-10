const db = require("../connection")

const createFlight = (data, callBack) => {
    if (data.flightPrice <= 0) return callBack("Payment is greater than 0", null, 400)
    db.query("insert into flights(routeId,name,capacity,status,flightPrice) values(?,?,?,?,?)", [data.routeId, data.name, data.capacity, data.status, data.flightPrice], (err, result) => {
        if (err) return callBack(err, null, 500)
        else return callBack(null, "Flight added", 201)
    })
}

const getFlight = (callBack) => {
    db.query("select * from flights", (err, result) => {
    if (err) return callBack(err, null, 500)
        return callBack(null, result, 200)
    })
}

const deleteFlight = (data, callBack) => {
    db.query("delete from flights where id=?", [data.id], (err, result) => {
     if (err) return callBack(err, null, 500)
        return callBack(null, "Flight successfully deleted", 200)
    })
}

module.exports = { createFlight, getFlight, deleteFlight }