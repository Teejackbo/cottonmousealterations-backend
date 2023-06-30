class TestController {
    async test(req, res) {
        res.json({
            message: 'Hello World',
        });
    }
}

module.exports = new TestController();
