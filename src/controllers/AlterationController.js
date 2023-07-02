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

    static async getAll(req, res) {
        try {
            const alterationService = new AlterationService();
            const alterations = await alterationService.getAll();
            console.log(alterations);
            return res.status(200).json({ success: true, alterations });
        } catch (e) {
            return res.status(500).json({ success: false, error: e.message });
        }
    }

    static async getById(req, res) {
        try {
            const alterationService = new AlterationService();
            const alteration = await alterationService.getById(req.params.id);
            return res.status(200).json({ success: true, alteration });
        } catch (e) {
            return res.status(500).json({ success: false, error: e.message });
        }
    }

    static async getByStatus(req, res) {
        try {
            const alterationService = new AlterationService();
            const alterations = await alterationService.getByStatus(req.params.status);
            return res.status(200).json({ success: true, alterations });
        } catch (e) {
            return res.status(500).json({ success: false, error: e.message });
        }
    }

    static async businessAccept(req, res) {
        try {
            const alterationService = new AlterationService();
            const alteration = await alterationService.businessAccept(req.params.id, req.body.estimatedPrice);
            return res.status(200).json({ success: true, alteration });
        } catch (e) {
            return res.status(500).json({ success: false, error: e.message });
        }
    }
}

module.exports = AlterationController;
