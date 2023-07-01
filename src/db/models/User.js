const QueryBuilder = require("../QueryBuilder");

class User {
    static tableName = "users";

    constructor({ id, first_name, last_name, email, password }) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
    }

    static async findOne(conditions) {
        const queryBuilder = new QueryBuilder();
        const query = queryBuilder
            .select()
            .from(this.tableName)
            .where(conditions)
            .limit(1);

        const [results] = await query.execute();
        if (results.length === 0) {
            return null;
        }

        return new User(results[0]);
    }
}

module.exports = User;
