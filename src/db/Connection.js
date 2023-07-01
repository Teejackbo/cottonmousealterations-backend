const mysql = require("mysql2/promise");

class Connection {
    async connect() {
        this.connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    async query(sql, params) {
        return this.connection.query(sql, params);
    }

    async end() {
        return this.connection.end();
    }
}

module.exports = Connection;
