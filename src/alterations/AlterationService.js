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
}

module.exports = AlterationService;
