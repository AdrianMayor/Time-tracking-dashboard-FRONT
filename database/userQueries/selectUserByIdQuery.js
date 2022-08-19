const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const selectUserByIdQuery = async (id) => {
    let connection;
    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `
            SELECT name, lastname, avatar, modifiedAt, createdAt FROM users WHERE id = ?
        `,
            [id]
        );

        if (users.length < 1) {
            throw generateError('User Not Found', 404);
        }

        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdQuery;
