const Alteration = require("../db/models/Alteration");
const EmailSender = require("../emails/EmailSender");
const SettingService = require("../SettingService");

class AlterationService {
    async create({ customerName, customerEmail, description }) {
        const alteration = await Alteration.create({
            customerName,
            customerEmail,
            description
        });

        const emailSender = new EmailSender();
        await emailSender.sendEmail({
            to: customerEmail,
            dynamicTemplateData: {
                alteration: {
                    id: alteration.id,
                    customerName,
                }
            },
            templateId: SettingService.get("emailTemplates.alterationCreated")
        });

        return alteration;
    }

    async getAll() {
        return Alteration.findAll();
    }

    async getById(id) {
        return Alteration.findOne({ id });
    }

    async getByStatus(status) {
        return Alteration.findAll({ status });
    }

    async businessAccept(id, estimatedPrice) {
        const alteration = await Alteration.findOne({ id });
        if (!alteration) {
            throw new Error("Alteration not found");
        }

        if (alteration.status !== Alteration.Status.PendingBusinessApproval) {
            throw new Error("Alteration is not pending business approval");
        }

        alteration.status = Alteration.Status.PendingCustomerApproval;
        alteration.estimatedPrice = estimatedPrice;
        await alteration.save();
        return alteration;
    }
}

module.exports = AlterationService;
