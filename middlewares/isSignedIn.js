var { expressjwt: jwt } = require("express-jwt");

const isSignedIn = jwt({
    secret: 'secret',
    algorithms: ["HS256"],
    userProperty: "auth"
});

module.exports = isSignedIn