const selectUserByIdQuery = require('../../database/userQueries/selectUserByIdQuery');
const updateUserQuery = require('../../database/userQueries/updateUserQuery');
const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const updateUser = async (req, res, next) => {
    try {
        let { lastname, name } = req.body;

        if (!name && !lastname && !req.files?.avatar) {
            throw generateError('Missing edit fields', 400);
        }

        const user = await selectUserByIdQuery(req.user.id);

        let avatar;

        if (req.files?.avatar) {
            if (user.avatar) {
                deletePhoto(user.avatar);
            }
            avatar = await savePhoto(req.files.avatar);
        }

        name = name || user.name;
        lastname = lastname || user.lastname;
        avatar = avatar || user.avatar;

        await updateUserQuery(name, lastname, avatar, req.user.id);

        res.send({
            status: 'ok',
            message: 'User Updated',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = updateUser;
