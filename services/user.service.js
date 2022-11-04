const db = require("../connection")
const bcrypt = require('bcrypt')

const createUser = (data, callBack) => {
    db.query("select * from user where email=?", [data.email], (err, result1) => {
        if (err) return callBack(err, null, 500)
        if (result1[0]) return callBack(null, "email already exists", 409)
        let hash = bcrypt.hashSync(data.password, 10);
        db.query("insert into user(name,email,password,address,contactNo) values(?,?,?,?,?)", [data.name, data.email, hash, data.address, data.contactNo], (err, result2) => {
            if (err) return callBack(err, null, 500)
            else return callBack(null, "Register successfully", 201)
        })
    })
}

const getUser = (callBack) => {
    db.query("select * from user", (err, result) => {

        if (err) return callBack(err, null, 500)
        return callBack(null, result, 200)
    })

}






module.exports = { createUser, getUser }