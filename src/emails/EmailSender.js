const sendgrid = require("@sendgrid/mail");
const SettingService = require("../SettingService");

class EmailSender {
    constructor() {
        sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    }

    sendEmail({ to, dynamicTemplateData, templateId }) {
        if (SettingService.get("email.enabled") !== true) {
            console.log("Email sending is disabled.");
            return true;
        }

        try {
            const message = {
                from: { email: process.env.SENDGRID_SENDER_EMAIL },
                personalizations: [
                    {
                        to: [{ email: to }],
                        dynamic_template_data: dynamicTemplateData,
                    }
                ],
                template_id: templateId,
            };

            return sendgrid.send(message);
        } catch (e) {
            throw new Error("Failed to send alteration confirmation email.");
        }
    }
}

module.exports = EmailSender;
