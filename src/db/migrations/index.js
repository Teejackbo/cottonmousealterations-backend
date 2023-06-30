require("dotenv").config();
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function main() {
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    });

    await connection.query(
        `CREATE TABLE IF NOT EXISTS migrations (
            migration_name VARCHAR(255) NOT NULL
        )
    `);

    const [migrations] = await connection.query(`SELECT * FROM migrations`);
    const files = fs.readdirSync(__dirname).filter(file => file !== "index.js");
    const migrationsToRun = files.filter(f => !migrations.find(m => m.migration_name === f));
    await Promise.all(migrationsToRun.map(fileName => {
        const migration = require(path.join(__dirname, fileName));
        return migration.up(connection);
    }));

    await Promise.all(migrationsToRun.map(fileName => {
        return connection.query(`INSERT INTO migrations (migration_name) VALUES (?)`, [fileName]);
    }));

    await connection.end();
}

main();
