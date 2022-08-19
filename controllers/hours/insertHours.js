const insertHourQuery = require('../../database/hoursQuery/insertHoursQuery');
const checkCategoryInWorkDate = require('../../database/hoursQuery/checkCategoryInWorkDate');
const { generateError } = require('../../helpers');

const insertHour = async (req, res, next) => {
    try {
        let { hours, workDate, category } = req.body;

        if (!hours && !workDate && !category)
            throw generateError('Missing fields', 400);

        if (isNaN(hours)) throw generateError('Hours should be a number', 400);
        if (workDate instanceof Date && !isNaN)
            throw generateError('Incorrect Date', 400);
        if (
            category !== 'Work' &&
            category !== 'Play' &&
            category !== 'Study' &&
            category !== 'Exercise' &&
            category !== 'Social' &&
            category !== 'Self Care'
        )
            throw generateError('Incorrect category', 400);

        await checkCategoryInWorkDate(category, workDate, req.user.id);

        await insertHourQuery(hours, workDate, category, req.user.id);

        res.send({
            status: 'ok',
            message: `Recorded time at ${category}`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = insertHour;
