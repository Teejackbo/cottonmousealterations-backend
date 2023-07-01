const sendgrid = require("@sendgrid/mail");

class EmailSender {
    constructor() {
        sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    }

    sendEmail({ to, dynamicTemplateData, templateId }) {
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
    }
}

module.exports = EmailSender;
