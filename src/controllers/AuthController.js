const AuthenticationProvider = require("../auth/AuthenticationProvider");

class AuthController {
    static authorize(req, res) {
        if (req.body.username === "admin" && req.body.password === "admin") {
            const authProvider = new AuthenticationProvider();
            const token = authProvider.signToken({ username: req.body.username });
            return res.json({
                message: "Successfully logged in",
                token
            });
        }

        res.sendStatus(403);
    }
}

module.exports = AuthController;
