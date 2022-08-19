const {
    previousDay,
    previousMonday,
    nextSunday,
    previousSunday,
} = require('date-fns');

const selectWeeklyHoursQuery = require('../../database/hoursQuery/selectWeeklyHoursQuery');

const getWeeklyHours = async (req, res, next) => {
    try {
        const today = new Date();
        const [weekStart] = previousMonday(today, { weekStartsOn: 1 })
            .toISOString()
            .split('T');

        const [weekEnd] = nextSunday(today, { weekStartsOn: 1 })
            .toISOString()
            .split('T');
        const [lastWeekStart] = previousMonday(previousDay(today, 0), {
            weekStartsOn: 1,
        })
            .toISOString()
            .split('T');
        const [lastWeekEnd] = previousSunday(today, { weekStartsOn: 1 })
            .toISOString()
            .split('T');

        const hours = await selectWeeklyHoursQuery(
            req.user.id,
            weekStart,
            weekEnd,
            lastWeekStart,
            lastWeekEnd
        );

        res.send({
            status: 'ok',
            data: {
                hours,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getWeeklyHours;
