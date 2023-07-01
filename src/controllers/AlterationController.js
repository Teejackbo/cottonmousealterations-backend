const AlterationService = require("../alterations/AlterationService");

class AlterationController {
    static async create(req, res) {
        try {
            const alterationService = new AlterationService();
            const alteration = await alterationService.create(req.body);
            return res.status(201).json({ success: true, alteration });
        } catch (e) {
            return res.status(500).json({ success: false, error: e.message });
        }
    }
}

module.exports = AlterationController;
