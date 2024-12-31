const db = require('./connection');

const findOrCreateUser = (username) => {
    return new Promise((resolve, reject) => {
        const now = new Date();
        db.query(
            `SELECT * FROM users WHERE username = ?`,
            [username],
            (err, results) => {
                if (err) return reject(err);
                if (results.length > 0) {
                    // Обновляем дату последнего входа
                    db.query(
                        `UPDATE users SET last_login = ? WHERE username = ?`,
                        [now, username],
                        (err) => {
                            if (err) return reject(err);
                            resolve(results[0]);
                        }
                    );
                } else {
                    // Создаём нового пользователя
                    db.query(
                        `INSERT INTO users (username, registration_date, last_login) VALUES (?, ?, ?)`,
                        [username, now, now],
                        (err, results) => {
                            if (err) return reject(err);
                            resolve({ id: results.insertId, username, registration_date: now, last_login: now });
                        }
                    );
                }
            }
        );
    });
};

module.exports = { findOrCreateUser };