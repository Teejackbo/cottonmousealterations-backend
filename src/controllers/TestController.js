class TestController {
    static async test(req, res) {
        if (req.params.id) {
            return res.json({
                message: `Hello World ${req.params.id}`,
            });
        }

        console.log(req);
        return res.json({
            message: 'Hello World',
        });
    }
}

module.exports = TestController;
