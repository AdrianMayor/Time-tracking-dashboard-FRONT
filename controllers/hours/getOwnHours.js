const selectHoursByIdQuery = require('../../database/hoursQuery/selectHoursByUserQuery');

const getOwnHours = async (req, res, next) => {
    try {
        let hours = await selectHoursByIdQuery(req.user.id);

        hours = hours.map((hour) => {
            hour.workDate = new Date(hour.workDate).toISOString().split('T')[0];
            return hour;
        });

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

module.exports = getOwnHours;
