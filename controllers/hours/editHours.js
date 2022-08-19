const selectHoursByIdQuery = require('../../database/hoursQuery/selectHoursByIdQuery');
const editHoursQuery = require('../../database/hoursQuery/editHoursQuery');
const { generateError } = require('../../helpers');

const editHours = async (req, res, next) => {
    try {
        const { idHours } = req.params;
        let { hours, workDate, category } = req.body;

        let hourRecord = await selectHoursByIdQuery(idHours, req.user.id);

        if (!hours && !workDate && !category)
            throw generateError('Missing edit fields', 400);

        hours = hours || hourRecord.hours;
        workDate = workDate || hourRecord.workDate;
        category = category || hourRecord.category;

        await editHoursQuery(
            hours,
            workDate,
            category,
            hourRecord.id,
            req.user.id
        );

        res.send({
            status: 'ok',
            message: 'Updated record',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editHours;
