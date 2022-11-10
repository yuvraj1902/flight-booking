const admin = {
    id: 5,
    email: "yuvi@gmail.com",
    password: "yuvi"
}
const db = require('../connection')

const isAdmin = (req, res, next) => {
    if (req.auth.id == admin.id) {
        next();
    } else {
        return res.status(403).json({
            error: "Not an Admin"
        })
    }
}
module.exports = isAdmin