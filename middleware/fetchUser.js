const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;


const fetchAdmin = (req, res, next) => {
    // get the user from the jwt token
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).send({ error: "access denied" })
    }

    try {
        const data = jwt.verify(token.slice(7), JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "access denied" })
    }
}

module.exports = fetchAdmin;