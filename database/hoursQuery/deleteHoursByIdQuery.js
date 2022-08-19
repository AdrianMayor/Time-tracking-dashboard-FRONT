const getConnection = require('../getConnection');

const deleteHourByIdQuery = async (idHour) => {
    let connection;
    try {
        connection = await getConnection();

        connection.query(
            `
                    DELETE FROM hours WHERE id = ?
            `,
            [idHour]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteHourByIdQuery;
