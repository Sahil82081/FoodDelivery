const jwt = require('jsonwebtoken')

const adminauth = (req, res, next) => {

    const token = req.header('Authorization')
    if (!token || token == "") {
        return res.status(400).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token.' });
        req.admin = decoded
        next()
    })
}

module.exports = { adminauth }