const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (message, code) => {
    const err = new Error(message);
    err.statusCode = code;
    return err;
};

/**
 * ################
 * ## Save Photo ##
 * ################
 */

const getHours = (category, array) => {
    const find = array.find((item) => item.category === category);

    /*  {
        if (item.category === category) {
            return item.hours;
        } else {
            return 0;
        }
    }); */

    return find ? parseInt(find.hours) : 0;
};

/**
 * ################
 * ## Save Photo ##
 * ################
 */

const savePhoto = async (img) => {
    const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);
    try {
        await fs.access(uploadsPath);
    } catch {
        await fs.mkdir(uploadsPath);
    }

    const sharpImg = sharp(img.data);

    sharpImg.resize(234);

    const imgName = `${uuid()}.jpg`;
    const imgPath = path.join(uploadsPath, imgName);

    await sharpImg.toFile(imgPath);

    return imgName;
};

/**
 * ##################
 * ## Delete Photo ##
 * ##################
 */

const deletePhoto = async (imgName) => {
    try {
        const imgPath = path.join(__dirname, process.env.UPLOADS_DIR, imgName);

        try {
            await fs.access(imgPath);
        } catch {
            return false;
        }

        await fs.unlink(imgPath);
    } catch (err) {
        throw generateError('Error removing image from server');
    }
};

module.exports = {
    generateError,
    savePhoto,
    deletePhoto,
    getHours,
};
