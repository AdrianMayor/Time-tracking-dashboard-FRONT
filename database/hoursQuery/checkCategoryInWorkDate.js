const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectHoursByIdQuery = async (category, workDate, idUser) => {
    let connection;

    try {
        connection = await getConnection();

        let [hours] = await connection.query(
            `
                SELECT id
                FROM hours WHERE category = ? AND workDate = ? AND idUser = ?
            `,
            [category, workDate, idUser]
        );

        if (hours.length > 0)
            throw generateError(
                'There are already records with this category that day',
                405
            );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectHoursByIdQuery;
