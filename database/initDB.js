require('dotenv').config();

const getConnection = require('./getConnection.js');

async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log('Creating tables...');

        await connection.query(`DROP TABLE IF EXISTS hours`);
        await connection.query(`DROP TABLE IF EXISTS users`);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(60) NOT NULL,
                lastname VARCHAR(200),
                password VARCHAR(255) NOT NULL,
                avatar VARCHAR(255),
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP NOT NULL
                )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS hours (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                hours TINYINT UNSIGNED NOT NULL,
                workDate DATE NOT NULL,
                category ENUM ('Work', 'Play', 'Study', 'Exercise', 'Social', 'Self Care') DEFAULT 'Work',
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP NOT NULL
                );
        `);

        await connection.query(`
            INSERT INTO users (name, lastname, password, avatar, modifiedAt, createdAt)
            VALUES  ('Adrian', 'Mayor', '$2b$10$Sw8p0XoXiH8wDJjKjvUXDO/j0pU83.rct5Diz5dmqSzHyV6swaawK','45760529-33c6-4c31-ab1a-ee6ae04a4a4a.jpg', '2022-07-24','2022-07-23'),
                    ('Manolito', 'Duran','$2b$10$n4YuXhq8Dhd1AB4LQ6rXWu7kDHTOiXDThGS6F.N3rUoIBVrwj6dMC', '1e03abb0-dff3-49cb-89d0-23f4c012cef4.jpg',  '2022-07-24', '2022-07-24')
        `);

        const today = new Date();

        const yesterdayDate = '2022-08-01';

        const thisMonthDate = '2022-07-29';

        const lastMonthDate = '2022-07-04';

        const thisWeekDate = '2022-08-01';

        const lastWeekDate = '2022-07-26';

        console.log(today);
        console.log(yesterdayDate);
        console.log(thisMonthDate);
        console.log(lastMonthDate);
        console.log(thisWeekDate);
        console.log(lastWeekDate);

        await connection.query(
            `
                INSERT INTO hours (idUser, hours, workDate, category, createdAt, modifiedAt)
                VALUES  ('1', '4', ?, 'Work', ?, ?),
                        ('1', '2', ?, 'Work', ?, ?),
                        ('1', '8', ?, 'Work', ?, ?),
                        ('1', '4', ?, 'Work', ?, ?),
                        ('1', '6', ?, 'Work', ?, ?),
                        ('1', '4', ?, 'Work', ?, ?)`,
            [
                today,
                today,
                today,
                yesterdayDate,
                today,
                today,
                thisMonthDate,
                today,
                today,
                lastMonthDate,
                today,
                today,
                thisWeekDate,
                today,
                today,
                lastWeekDate,
                today,
                today,
            ]
        );

        await connection.query(
            `
                INSERT INTO hours (idUser, hours, workDate, category, createdAt, modifiedAt)
                VALUES  ('1', '3', ?, 'Play', ?, ?),
                        ('1', '6', ?, 'Play', ?, ?),
                        ('1', '1', ?, 'Play', ?, ?),
                        ('1', '1', ?, 'Play', ?, ?),
                        ('1', '9', ?, 'Play', ?, ?),
                        ('1', '6', ?, 'Play', ?, ?)`,
            [
                today,
                today,
                today,
                yesterdayDate,
                today,
                today,
                thisMonthDate,
                today,
                today,
                lastMonthDate,
                today,
                today,
                thisWeekDate,
                today,
                today,
                lastWeekDate,
                today,
                today,
            ]
        );

        await connection.query(
            `
                INSERT INTO hours (idUser, hours, workDate, category, createdAt, modifiedAt)
                VALUES  ('1', '1', ?, 'Study', ?, ?),
                        ('1', '10', ?, 'Study', ?, ?),
                        ('1', '8', ?, 'Study', ?, ?),
                        ('1', '6', ?, 'Study', ?, ?),
                        ('1', '6', ?, 'Study', ?, ?),
                        ('1', '7', ?, 'Study', ?, ?)`,
            [
                today,
                today,
                today,
                yesterdayDate,
                today,
                today,
                thisMonthDate,
                today,
                today,
                lastMonthDate,
                today,
                today,
                thisWeekDate,
                today,
                today,
                lastWeekDate,
                today,
                today,
            ]
        );

        await connection.query(
            `
                INSERT INTO hours (idUser, hours, workDate, category, createdAt, modifiedAt)
                VALUES  ('1', '5', ?, 'Exercise', ?, ?),
                        ('1', '4', ?, 'Exercise', ?, ?),
                        ('1', '5', ?, 'Exercise', ?, ?),
                        ('1', '5', ?, 'Exercise', ?, ?),
                        ('1', '2', ?, 'Exercise', ?, ?),
                        ('1', '1', ?, 'Exercise', ?, ?)`,
            [
                today,
                today,
                today,
                yesterdayDate,
                today,
                today,
                thisMonthDate,
                today,
                today,
                lastMonthDate,
                today,
                today,
                thisWeekDate,
                today,
                today,
                lastWeekDate,
                today,
                today,
            ]
        );

        await connection.query(
            `
                INSERT INTO hours (idUser, hours, workDate, category, createdAt, modifiedAt)
                VALUES  ('1', '1', ?, 'Social', ?, ?),
                        ('1', '2', ?, 'Social', ?, ?),
                        ('1', '1', ?, 'Social', ?, ?),
                        ('1', '3', ?, 'Social', ?, ?),
                        ('1', '1', ?, 'Social', ?, ?),
                        ('1', '4', ?, 'Social', ?, ?)`,
            [
                today,
                today,
                today,
                yesterdayDate,
                today,
                today,
                thisMonthDate,
                today,
                today,
                lastMonthDate,
                today,
                today,
                thisWeekDate,
                today,
                today,
                lastWeekDate,
                today,
                today,
            ]
        );

        await connection.query(
            `
                INSERT INTO hours (idUser, hours, workDate, category, createdAt, modifiedAt)
                VALUES  ('1', '2', ?, 'Self Care', ?, ?),
                        ('1', '4', ?, 'Self Care', ?, ?),
                        ('1', '2', ?, 'Self Care', ?, ?),
                        ('1', '1', ?, 'Self Care', ?, ?),
                        ('1', '2', ?, 'Self Care', ?, ?),
                        ('1', '4', ?, 'Self Care', ?, ?)`,
            [
                today,
                today,
                today,
                yesterdayDate,
                today,
                today,
                thisMonthDate,
                today,
                today,
                lastMonthDate,
                today,
                today,
                thisWeekDate,
                today,
                today,
                lastWeekDate,
                today,
                today,
            ]
        );

        console.log('Tables created!');
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
