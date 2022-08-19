const insertUserQuery = require('../../database/userQueries/insertUserQuery');

const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
    try {
        const { password, name, lastname } = req.body;

        if (!name || !password) {
            throw generateError('Missing fields', 400);
        }

        await insertUserQuery(password, name);

        res.send({
            status: 'ok',
            message: 'User created',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUser;
