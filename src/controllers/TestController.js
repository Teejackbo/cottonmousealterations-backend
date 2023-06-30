const QueryBuilder = require("../db/QueryBuilder");

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
        const query = new QueryBuilder();
        const sql = 'SELECT * FROM migrations';
        const result = await query.execute(sql);
        return res.json(result);
    }
}

module.exports = TestController;
