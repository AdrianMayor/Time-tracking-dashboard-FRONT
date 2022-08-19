const { getHours } = require('../../helpers');
const getConnection = require('../getConnection');

const selectDailyHoursQuery = async (
    idUser,
    firstDayMonth,
    lastDayMonth,
    firstDayPreviousMonth,
    lastDayPreviousMonth
) => {
    let connection;
    try {
        connection = await getConnection();

        const [currentMonthlyHours] = await connection.query(
            `
                SELECT 	category,
                        SUM(hours) AS hours 
                FROM hours 
                WHERE workDate BETWEEN ? AND ? AND idUser = ?
                GROUP BY category;
            `,
            [firstDayMonth, lastDayMonth, idUser]
        );

        const [lastMonthlyHours] = await connection.query(
            `
                SELECT  category,
                        SUM(hours) AS hours 
                FROM hours 
                WHERE workDate BETWEEN ? AND ? AND idUser = ?
                GROUP BY category
            `,
            [firstDayPreviousMonth, lastDayPreviousMonth, idUser]
        );

        const data = [
            {
                title: 'Work',
                timeframes: {
                    monthly: {
                        current: getHours('Work', currentMonthlyHours),
                        previous: getHours('Work', lastMonthlyHours),
                    },
                },
            },
            {
                tittle: 'Play',
                timeframes: {
                    monthly: {
                        current: getHours('Play', currentMonthlyHours),
                        previous: getHours('Play', lastMonthlyHours),
                    },
                },
            },
            {
                tittle: 'Study',
                timeframes: {
                    monthly: {
                        current: getHours('Study', currentMonthlyHours),
                        previous: getHours('Study', lastMonthlyHours),
                    },
                },
            },
            {
                tittle: 'Exercise',
                timeframes: {
                    monthly: {
                        current: getHours('Exercise', currentMonthlyHours),
                        previous: getHours('Exercise', lastMonthlyHours),
                    },
                },
            },
            {
                tittle: 'Social',
                timeframes: {
                    monthly: {
                        current: getHours('Social', currentMonthlyHours),
                        previous: getHours('Social', lastMonthlyHours),
                    },
                },
            },
            {
                tittle: 'Self Care',
                timeframes: {
                    monthly: {
                        current: getHours('Self Care', currentMonthlyHours),
                        previous: getHours('Self Care', lastMonthlyHours),
                    },
                },
            },
        ];

        return data;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectDailyHoursQuery;
