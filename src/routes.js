const Route = require("./Route");
const AuthController = require("./controllers/AuthController");
const AlterationController = require("./controllers/AlterationController");
const AlterationValidator = require("./alterations/AlterationValidator");

module.exports = [
    Route.post("/login", AuthController.authorize),
    Route.post("/alteration", AlterationController.create).withMiddleware(AlterationValidator.create)
];
