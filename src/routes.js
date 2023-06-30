const Route = require("./Route");
const TestController = require("./controllers/TestController");
const OtherController = require("./controllers/OtherController");
const AuthController = require("./controllers/AuthController");
const AuthenticationMiddleware = require("./auth/AuthenticationMiddleware");

module.exports = [
    Route.get("/test", TestController.test),
    Route.get("/test/:id", TestController.test),
    Route.get("/auth-required", TestController.test)
        .withMiddleware(AuthenticationMiddleware.verifyToken),
    Route.post("/authorize", AuthController.authorize)
];
