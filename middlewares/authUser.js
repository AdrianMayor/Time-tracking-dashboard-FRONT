const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) throw generateError('Loggin required', 401);

        let payload;

        try {
            payload = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError('Invalid token', 401);
        }

        req.user = payload;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
