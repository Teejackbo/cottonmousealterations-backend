const AuthenticationProvider = require("./AuthenticationProvider");

class AuthenticationMiddleware {
    static verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.sendStatus(401);
        }

        try {
            const authenticationProvider = new AuthenticationProvider();
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = authenticationProvider.verifyToken(bearerToken);
            next();
        } catch (e) {
            return res.sendStatus(403);
        }
    }
}

module.exports = AuthenticationMiddleware;
