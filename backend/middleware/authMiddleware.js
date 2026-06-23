const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    try {

        const token = req.cookies.token
        if (!token) { return res.status(400).json({ message: "token not provided" }) }
        const decoded = jwt.verify(token, process.env.SECRETKEY)
        req.user = decoded
        next();

    } catch (error) {
        return res.status(403).json({ message: error.message })
    }
};

module.exports = authMiddleware;