const { getHours } = require('../../helpers');
const getConnection = require('../getConnection');

const selectDailyHoursQuery = async (idUser, today, yesterday) => {
    let connection;
    try {
        connection = await getConnection();

        const [currentDailyHours] = await connection.query(
            `
                SELECT 	category,
                        SUM(hours) AS hours 
                FROM hours 
                WHERE workDate = ? AND idUser = ?
                GROUP BY category;
            `,
            [today, idUser]
        );

        const [lastDailyHours] = await connection.query(
            `
                SELECT  category,
                        SUM(hours) AS hours 
                FROM hours 
                WHERE workDate = ? AND idUser = ?
                GROUP BY category
            `,
            [yesterday, idUser]
        );

        const data = [
            {
                title: 'Work',
                timeframes: {
                    daily: {
                        current: getHours('Work', currentDailyHours),
                        previous: getHours('Work', lastDailyHours),
                    },
                },
            },
            {
                tittle: 'Play',
                timeframes: {
                    daily: {
                        current: getHours('Play', currentDailyHours),
                        previous: getHours('Play', lastDailyHours),
                    },
                },
            },
            {
                tittle: 'Study',
                timeframes: {
                    daily: {
                        current: getHours('Study', currentDailyHours),
                        previous: getHours('Study', lastDailyHours),
                    },
                },
            },
            {
                tittle: 'Exercise',
                timeframes: {
                    daily: {
                        current: getHours('Exercise', currentDailyHours),
                        previous: getHours('Exercise', lastDailyHours),
                    },
                },
            },
            {
                tittle: 'Social',
                timeframes: {
                    daily: {
                        current: getHours('Social', currentDailyHours),
                        previous: getHours('Social', lastDailyHours),
                    },
                },
            },
            {
                tittle: 'Self Care',
                timeframes: {
                    daily: {
                        current: getHours('Self Care', currentDailyHours),
                        previous: getHours('Self Care', lastDailyHours),
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
