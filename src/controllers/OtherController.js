class OtherController {
    static other(req, res) {
        res.json({
            message: 'Other',
        });
    }
}

module.exports = OtherController;