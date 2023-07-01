const AuthenticationService = require("../auth/AuthenticationService");

class AuthController {
    static async authorize(req, res) {
        try {
            const authenticationService = new AuthenticationService();
            const token = await authenticationService.login(req.body);
            return res.json({ success: true, token });
        } catch (e) {
            return res.status(401).json({ success: false, message: e.message });
        }
    }
}

module.exports = AuthController;
