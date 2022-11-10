const db = require("../connection")

const routeFlight = (data, callBack) => {
     db.query("select id from routes where source=? and destination=?", [data.source, data.destination], (err, result1) => {
         if (err) return callBack(err, null, 500)
        if (!result1[0]) return callBack(null, "No rotes found", 404)
        db.query("select * from flights where routeId=?", [result1[0].id], (err, result) => {
            if (err) return callBack(err, null, 500)
            return callBack(null, result, 302)
        })
     })
}

module.exports = routeFlight