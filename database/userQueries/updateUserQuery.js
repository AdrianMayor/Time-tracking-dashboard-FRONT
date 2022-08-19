const getConnection = require('../getConnection');

const updateUserQuery = async (name, lastname, avatar, idUser) => {
    let connection;
    try {
        connection = await getConnection();

        await connection.query(
            `
            UPDATE users SET name = ?, lastname = ?, avatar = ?, modifiedAt = ? WHERE id = ?
        `,
            [name, lastname, avatar, new Date(), idUser]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserQuery;
