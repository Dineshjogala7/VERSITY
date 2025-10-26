const jwt = require('jsonwebtoken')
require('dotenv').config();

function checkAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization || req.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Signup to get Authenticated!!!" });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Not a valid one with no token!!" });
        }
        const user = jwt.verify(token, process.env.JSON_SECRET_KEY);
        req.userid = user.id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = checkAuth;