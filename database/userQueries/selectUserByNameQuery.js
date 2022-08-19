const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const selectUserByNameQuery = async (name) => {
    let connection;
    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `
            SELECT id, password FROM users WHERE name = ?
        `,
            [name]
        );

        if (users.length < 1) {
            throw generateError('Incorrect name', 404);
        }

        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByNameQuery;
