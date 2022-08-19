const { getHours } = require('../../helpers');
const getConnection = require('../getConnection');

const selectDailyHoursQuery = async (
    idUser,
    weekStart,
    weekEnd,
    lastWeekStart,
    lastWeekEnd
) => {
    let connection;
    try {
        connection = await getConnection();

        const [currentWeeklyHours] = await connection.query(
            `
                SELECT 	category,
                        SUM(hours) AS hours 
                FROM hours 
                WHERE workDate BETWEEN ? AND ? AND idUser = ?
                GROUP BY category;
            `,
            [weekStart, weekEnd, idUser]
        );

        const [lastWeeklyHours] = await connection.query(
            `
                SELECT  category,
                        SUM(hours) AS hours 
                FROM hours 
                WHERE workDate BETWEEN ? AND ? AND idUser = ?
                GROUP BY category
            `,
            [lastWeekStart, lastWeekEnd, idUser]
        );

        const data = [
            {
                title: 'Work',
                timeframes: {
                    weekly: {
                        current: getHours('Work', currentWeeklyHours),
                        previous: getHours('Work', lastWeeklyHours),
                    },
                },
            },
            {
                tittle: 'Play',
                timeframes: {
                    weekly: {
                        current: getHours('Play', currentWeeklyHours),
                        previous: getHours('Play', lastWeeklyHours),
                    },
                },
            },
            {
                tittle: 'Study',
                timeframes: {
                    weekly: {
                        current: getHours('Study', currentWeeklyHours),
                        previous: getHours('Study', lastWeeklyHours),
                    },
                },
            },
            {
                tittle: 'Exercise',
                timeframes: {
                    weekly: {
                        current: getHours('Exercise', currentWeeklyHours),
                        previous: getHours('Exercise', lastWeeklyHours),
                    },
                },
            },
            {
                tittle: 'Social',
                timeframes: {
                    weekly: {
                        current: getHours('Social', currentWeeklyHours),
                        previous: getHours('Social', lastWeeklyHours),
                    },
                },
            },
            {
                tittle: 'Self Care',
                timeframes: {
                    weekly: {
                        current: getHours('Self Care', currentWeeklyHours),
                        previous: getHours('Self Care', lastWeeklyHours),
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
