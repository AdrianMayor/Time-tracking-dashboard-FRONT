const getConnection = require('../getConnection');

const editHours = async (hours, workDate, category, idHour, idUser) => {
    let connection;
    try {
        connection = await getConnection();

        console.log(hours, workDate, category, idHour, idUser);

        connection.query(
            `
            UPDATE hours SET hours = ?, workDate = ?, category = ? WHERE id = ? AND idUser = ?
        `,
            [hours, workDate, category, idHour, idUser]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editHours;
