const jwt = require('jsonwebtoken');
const config = require("config");
module.exports = async (req, res, next) => {
    let token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access Denied:token should be provided");
    try {
        let decode = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send("Access Denied:token Invalid");
    }

}