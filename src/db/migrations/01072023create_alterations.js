module.exports = ({
    up(connection) {
        return connection.query(`
            CREATE TABLE alterations (
                id INT NOT NULL AUTO_INCREMENT,
                customer_email VARCHAR(255) NOT NULL,
                customer_name VARCHAR(255) NOT NULL,
                description VARCHAR(10000) NOT NULL,
                status VARCHAR(50) NOT NULL,
                PRIMARY KEY (id)
            );
        `);
    },

    down(connection) {
        return connection.query(`
            DROP TABLE alterations;
        `);
    }
})