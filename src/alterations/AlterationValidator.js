class AlterationValidator {
    static create(req, res, next) {
        const { customerName, customerEmail, description } = req.body;
        if (!customerName || !customerEmail || !description) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields."
            });
        }

        if (
            typeof customerName !== "string" ||
            typeof customerEmail !== "string" ||
            typeof description !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid field types."
            });
        }

        next();
    }
}

module.exports = AlterationValidator;
