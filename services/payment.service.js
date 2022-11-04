const db = require("../connection")


const createPayment = (data, callBack) => {
    if (data.price <= 0) return callBack("Price must be greater than 0", null, 400)

    db.query("select * from payment where bookingId =?", [data.bookingId], (err, result4) => {
        if (err) return callBack(err, null, 500)

        if (result4.length > 0) return callBack("Payment is already done on this booking", null, 409)

        db.query("select * from booking where id=?", [data.bookingId], (err, result1) => {
            if (err) return callBack(err, null, 500)

            console.log(result1)
            if (result1[0].finalPrice == data.price) {

                db.query("insert into payment(bookingId,mode,price) values(?,?,?)", [data.bookingId, data.mode, data.price], (err, result) => {
                    if (err) return callBack(err, null, 500)

                    db.query("select flights.id,capacity,noOfSeat from flights,booking where flights.id=booking.flightId and booking.id=? ", [data.bookingId], (err, result2) => {
                        if (err) return callBack(err, null, 500)

                        if (result2[0].capacity - result2[0].noOfSeat < 0) return callBack("Seat not available", null, 400)
                        db.query("update flights set capacity=? where id=? ", [result2[0].capacity - result2[0].noOfSeat, result2[0].id], (err, result3) => {
                            if (err) return callBack(err, null, 500)

                            if (result2[0].capacity - result2[0].noOfSeat == 0) {


                                db.query("update flights set status=? where id=?", ["Full", result2[0].id], (err, result5) => {
                                    if (err) return callBack(err, null, 500)
                                })
                            }


                            return callBack(null, "Payment added", 201)
                        })
                    })

                })


            } else {
                return callBack("Payment required", null, 400)
            }
        })
    })


}


const getPayment = (callBack) => {
    db.query("select * from payment", (err, result) => {

        if (err) return callBack(err, null, 500)
        return callBack(null, result, 200)
    })

}

const deletePayment = (data, callBack) => {

    db.query("select bookingId from payment where id =?", [data.id], (err, result1) => {
        if (err) return callBack(err, null, 500)
        db.query("select flights.id,capacity,noOfSeat from flights,booking where flights.id=booking.flightId and booking.id=?", [result1[0].bookingId], (err, result2) => {
            if (err) return callBack(err, null, 500)
            db.query("update flights set capacity=? where id=? ", [result2[0].capacity + result2[0].noOfSeat, result2[0].id], (err, result3) => {
                if (err) return callBack(err, null, 500)
                db.query("update flights set status=? where id=?", ["Empty", result2[0].id], (err, result5) => {
                    if (err) return callBack(err, null, 500)

                    db.query("delete from payment where id=?", [data.id], (err, result) => {
                        if (err) return callBack(err, null, 500)
                        return callBack(null, "Payment deleted", 200)
                    })
                })
            })
        })
    })

}

module.exports = { createPayment, getPayment, deletePayment }