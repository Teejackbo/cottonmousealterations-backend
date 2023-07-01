const bcrypt = require('bcrypt');

class HashingProvider {
    constructor() {
        this.saltRounds = 10;
    }

    async hash(value) {
        return bcrypt.hash(value, this.saltRounds);
    }

    async compare(value, hash) {
        return bcrypt.compare(value, hash);
    }
}

module.exports = HashingProvider;
