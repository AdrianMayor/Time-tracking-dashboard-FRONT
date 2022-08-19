require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileUpload');
const morgan = require('morgan');
const cors = require('cors');

const { PORT, UPLOADS_DIR, MYSQL_HOST } = process.env;

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(fileUpload());

app.use(express.static(UPLOADS_DIR));

/*
 *   #################
 *   ## Middlewares ##
 *   #################
 */
const authUser = require('./middlewares/authUser');

/*
 *   #####################
 *   ## Users Endpoints ##
 *   #####################
 */

const newUser = require('./controllers/users/newUser');
const loginUser = require('./controllers/users/loginUser');
const updateUser = require('./controllers/users/updateUser');
const getUSer = require('./controllers/users/getUser');

app.post('/users', newUser);
app.post('/users/login', loginUser);
app.put('/users', authUser, updateUser);
app.get('/users', authUser, getUSer);

/*
 *   #####################
 *   ## Hours Endpoints ##
 *   #####################
 */
const insertHour = require('./controllers/hours/insertHours');
const getOwnHours = require('./controllers/hours/getOwnHours');
const editHours = require('./controllers/hours/editHours');
const deleteHours = require('./controllers/hours/deleteHours');
const getDailyHours = require('./controllers/hours/getDailyHours');
const getWeeklyHours = require('./controllers/hours/getWeeklyHours');
const getMonthlyHours = require('./controllers/hours/getMonthlyHours');

app.post('/hours', authUser, insertHour);
app.get('/hours', authUser, getOwnHours);
app.put('/hours/:idHours', authUser, editHours);
app.delete('/hours/:idHours', authUser, deleteHours);
app.get('/hours/daily', authUser, getDailyHours);
app.get('/hours/weekly', authUser, getWeeklyHours);
app.get('/hours/monthly', authUser, getMonthlyHours);

/*
 *   ######################
 *   ## Middleware Error ##
 *   ######################
 */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/*
 *   ##########################
 *   ## Middleware Not Found ##
 *   ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 'ok',
        message: 'Not found!',
    });
});

/*
 *   ######################
 *   ## Server listening ##
 *   ######################
 */

app.listen(PORT, () => {
    console.log(`Server listening at http://${MYSQL_HOST}:${PORT}`);
});
