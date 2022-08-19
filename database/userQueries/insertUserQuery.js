const getConnection = require('../getConnection');
const bcrypt = require('bcrypt');

const { generateError } = require('../../helpers');

const insertUserQuery = async (password, name) => {
    let connection;
    try {
        connection = await getConnection();

        const [nameUsers] = await connection.query(
            'SELECT id FROM users WHERE name = ?',
            [name]
        );

        if (nameUsers.length > 0) {
            throw generateError('User already exists', 403);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query(
            `INSERT INTO users (password, name, createdAt, modifiedAt) VALUES ( ?, ?, ?, ?)`,
            [hashedPassword, name, new Date(), new Date()]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
