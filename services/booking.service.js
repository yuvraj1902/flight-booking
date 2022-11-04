const db = require("../connection")


const createBooking = (req, data, callBack) => {
    let finalPrice;
    if (data.noOfSeat <= 0) return callBack("Can't book seats", null, 400)
    db.query("select * from flights where id=?", [data.flightId], (err, result2) => {
        if (err) return callBack(err, null, 500)
        if (result2.length == 0) return callBack("Flight not found", null, 400)
        if (data.noOfSeat > result2[0].capacity) return callBack("Seat can't be book", null, 400)
        db.query("select * from booking where userId=?", [req.auth.id], (err, result4) => {
            if (err) return callBack(err, null, 500)
            db.query("select * from booking where couponId=?", [data.couponId], (err, result3) => {
                if (err) return callBack(err, null, 500)
                if (result4.length > 0) {
                    if (result3.length > 0) return callBack("Coupon can't be applied", null, 409)
                }
                db.query("select * from coupons where id=?", [data.couponId], (err, result) => {

                    if (result2.length == 0) return callBack("Coupon not found", null, 400)
                    if (err) return callBack(err, null, 500)

                    if (result[0].discountPercentage == null) {
                        finalPrice = result2[0].flightPrice * data.noOfSeat
                    } else {
                        finalPrice = (result2[0].flightPrice - ((result[0].discountPercentage / 100) * result2[0].flightPrice)) * data.noOfSeat;
                    }
                    console.log(finalPrice)
                    db.query("insert into booking(userId,flightId,noOfSeat,couponId,startTime,endTime,finalPrice) values(?,?,?,?,?,?,?)", [req.auth.id, data.flightId, data.noOfSeat, data.couponId, data.startTime, data.endTime, finalPrice], (err, result1) => {
                        if (err) return callBack(err, null, 500)
                        else return callBack(null, "Booking created proceed to payment", 201)
                    })
                })
            })
        })
    })
}


const getBooking = (callBack) => {
    db.query("select * from booking", (err, result) => {

        if (err) return callBack(err, null, 500)
        return callBack(null, result, 200)
    })

}

const deleteBooking = (data, callBack) => {

    db.query("delete from booking where id=?", [data.id], (err, result) => {

        if (err) return callBack(err, null, 500)
        return callBack(null, "Booking cancelled", 200)
    })

}

module.exports = { createBooking, getBooking, deleteBooking }