const { startOfToday } = require('date-fns');
const selectDailyHoursQuery = require('../../database/hoursQuery/selectDailyHoursQuery');

const getDailyHours = async (req, res, next) => {
    try {
        const [today] = new Date().toISOString().split('T');

        const [yesterday] = startOfToday().toISOString().split('T');

        const hours = await selectDailyHoursQuery(
            req.user.id,
            today,
            yesterday
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

module.exports = getDailyHours;
