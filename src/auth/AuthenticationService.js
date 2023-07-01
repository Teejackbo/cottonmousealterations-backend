const User = require("../db/models/User");
const HashingProvider = require("./HashingProvider");
const AuthenticationProvider = require("./AuthenticationProvider");

class AuthenticationService {
    async login({ email, password }) {
        const ERROR = "Email or password invalid.";
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(ERROR);
        }

        const hashingProvider = new HashingProvider();
        const isPasswordValid = await hashingProvider.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error(ERROR);
        }

        const authenticationProvider = new AuthenticationProvider();
        return authenticationProvider.signToken({ id: user.id, email: user.email });
    }
}

module.exports = AuthenticationService;
