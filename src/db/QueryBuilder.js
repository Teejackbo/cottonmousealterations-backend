const Connection = require('./Connection');

class QueryBuilder {
    constructor() {
        this.query = '';
        this.connection = new Connection();
    }

    select(fields = '*') {
        if (Array.isArray(fields)) {
            fields = fields.join(', ');
        }

        this.query += `SELECT ${fields} `;
        return this;
    }

    insert() {
        this.query += 'INSERT ';
        return this;
    }

    into(table) {
        this.query += `INTO ${table} `;
        return this;
    }

    values(values) {
        this.query += '(';
        Object.keys(values).forEach((key, index) => {
            this.query += key;
            if (index < Object.keys(values).length - 1) {
                this.query += ', ';
            }
        });

        this.query += ') ';
        this.query += 'VALUES (';
        Object.keys(values).forEach((key, index) => {
            this.query += `'${values[key]}'`;
            if (index < Object.keys(values).length - 1) {
                this.query += ', ';
            }
        });

        this.query += ')';
        return this;
    }

    from(table) {
        this.query += `FROM ${table} `;
        return this;
    }

    where(conditions) {
        this.query += 'WHERE ';
        Object.keys(conditions).forEach((key, index) => {
            this.query += `${key} = '${conditions[key]}'`;
            if (index < Object.keys(conditions).length - 1) {
                this.query += ' AND ';
            }
        });

        return this;
    }

    limit(limit) {
        this.query += `LIMIT ${limit}`;
        return this;
    }

    async execute() {
        await this.connection.connect();
        const result = this.connection.query(this.query);
        await this.connection.end();
        return result;
    }
}

module.exports = QueryBuilder;
