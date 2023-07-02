module.exports = ({
    up(connection) {
        return connection.query(`
            ALTER TABLE alterations ADD COLUMN estimated_price DECIMAL(10, 2);
        `);
    },

    down(connection) {
        return connection.query(`
            ALTER TABLE alterations DROP COLUMN estimated_price;
        `);
    }
})