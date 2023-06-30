const Connection = require('./Connection');

class QueryBuilder {
    constructor() {
        this.query = '';
        this.connection = new Connection();
    }

    async execute(sql) {
        await this.connection.connect();
        return this.connection.query(sql);
    }
}

module.exports = QueryBuilder;
