module.exports = ({
    up(connection) {
        return connection.query(`
            CREATE TABLE users (
                id INT NOT NULL AUTO_INCREMENT,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                PRIMARY KEY (id)
            );
        `);
    },

    down(connection) {
        return connection.query(`
            DROP TABLE users;
        `);
    }
})