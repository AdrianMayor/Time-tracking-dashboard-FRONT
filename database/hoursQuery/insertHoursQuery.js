const getConnection = require('../getConnection');

const insertHourQuery = async (hours, workDate, category, idUser) => {
    let connection;
    try {
        connection = await getConnection();

        await connection.query(
            `
                INSERT INTO hours (hours, workDate, category, idUser, modifiedAt, createdAt)
                VALUES (?, ?, ?, ?, ?, ?)
            `,
            [hours, workDate, category, idUser, new Date(), new Date()]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertHourQuery;
