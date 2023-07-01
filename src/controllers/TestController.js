const User = require("../db/models/User");

class TestController {
    static async test(req, res) {
        if (req.params.id) {
            return res.json({
                message: `Hello World ${req.params.id}`,
            });
        }

        return res.json({
            message: 'Hello World',
        });
    }

    static async getAll(req, res) {
        const user = await User.findOne({ id: 1 });
        return res.json(user);
    }
}

module.exports = TestController;
