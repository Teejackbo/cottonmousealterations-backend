const jwt = require("jsonwebtoken");

class AuthenticationProvider {
    constructor() {
        if (!process.env.PRIVATE_KEY) {
            throw new Error("PRIVATE_KEY is not defined in .env file");
        }

        this.privateKey = process.env.PRIVATE_KEY;
    }

    signToken(payload) {
        return jwt.sign(payload, this.privateKey, { expiresIn: "1d" });
    }

    verifyToken(token) {
        return jwt.verify(token, this.privateKey);
    }
}

module.exports = AuthenticationProvider;
