const Route = require("./Route");
const AuthController = require("./controllers/AuthController");
const AlterationController = require("./controllers/AlterationController");
const AlterationValidator = require("./alterations/AlterationValidator");
const AuthenticationMiddleware = require("./auth/AuthenticationMiddleware");

module.exports = [
    Route.post("/login", AuthController.authorize),
    Route.post("/alterations", AlterationController.create).withMiddleware(AlterationValidator.create),
    Route.get("/alterations", AlterationController.getAll).withMiddleware(AuthenticationMiddleware.verifyToken),
    Route.get("/alterations/:id", AlterationController.getById).withMiddleware(AuthenticationMiddleware.verifyToken),
    Route.get("/alterations/status/:status", AlterationController.getByStatus).withMiddleware(AuthenticationMiddleware.verifyToken),
    Route.post("/alterations/:id/business-accept", AlterationController.businessAccept)
        .withMiddleware(AuthenticationMiddleware.verifyToken)
        .withMiddleware(AlterationValidator.businessAccept),
];
