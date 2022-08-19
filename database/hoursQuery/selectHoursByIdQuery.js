const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectHoursByIdQuery = async (idHour, idUser) => {
    let connection;

    try {
        connection = await getConnection();

        let [hours] = await connection.query(
            `
                SELECT *
                FROM hours WHERE id = ? AND idUser = ?
            `,
            [idHour, idUser]
        );

        if (hours.length < 1) throw generateError('There are no records', 401);

        return hours[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectHoursByIdQuery;
