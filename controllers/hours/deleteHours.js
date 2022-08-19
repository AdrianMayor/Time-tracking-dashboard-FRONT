const deleteHourByIdQuery = require('../../database/hoursQuery/deleteHoursByIdQuery');
const selectHoursByIdQuery = require('../../database/hoursQuery/selectHoursByIdQuery');

const deleteHours = async (req, res, next) => {
    try {
        const { idHours } = req.params;

        const hour = await selectHoursByIdQuery(idHours, req.user.id);

        await deleteHourByIdQuery(hour.id);

        res.send({
            status: 'ok',
            message: 'Hour deleted',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteHours;
