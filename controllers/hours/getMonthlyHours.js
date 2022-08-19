const { startOfMonth, lastDayOfMonth } = require('date-fns');

const selectMonthlyHoursQuery = require('../../database/hoursQuery/selectMonthlyHoursQuery');
const getMonthlyHours = async (req, res, next) => {
    try {
        const today = new Date();
        const previousMonthDate = new Date(
            new Date().setMonth(new Date().getMonth() - 1)
        );
        const [firstDayMonth] = startOfMonth(today).toISOString().split('T');
        const [lastDayMonth] = lastDayOfMonth(today).toISOString().split('T');
        const [firstDayPreviousMonth] = startOfMonth(previousMonthDate)
            .toISOString()
            .split('T');
        const [lastDayPreviousMonth] = lastDayOfMonth(previousMonthDate)
            .toISOString()
            .split('T');

        const hours = await selectMonthlyHoursQuery(
            req.user.id,
            firstDayMonth,
            lastDayMonth,
            firstDayPreviousMonth,
            lastDayPreviousMonth
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

module.exports = getMonthlyHours;
