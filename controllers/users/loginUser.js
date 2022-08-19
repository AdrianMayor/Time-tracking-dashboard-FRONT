const selectUserByNameQuery = require('../../database/userQueries/selectUserByNameQuery');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            throw generateError('Missing fields to fill', 400);
        }

        const user = await selectUserByNameQuery(name);

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) throw generateError('Incorrect Password', 401);

        const payload = {
            id: user.id,
        };

        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            message: 'Successful login',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};
module.exports = loginUser;
