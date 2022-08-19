const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectHoursByIdQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        let [hours] = await connection.query(
            `
                SELECT *
                FROM hours WHERE idUser = ?
            `,
            [idUser]
        );

        if (hours.length < 1) throw generateError('There are no records');

        return hours;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectHoursByIdQuery;
