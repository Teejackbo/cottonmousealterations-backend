const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const SettingService = require("./SettingService");

class App {
    constructor(routes) {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(cors(SettingService.get("cors")));
        this.routes = routes;
        this.init();
    }

    init() {
        this.routes.forEach(route => {
            if (route.hasMiddleware()) {
                this.app[route.method](route.path, route.middleware, route.handler);
            }

            this.app[route.method](route.path, route.handler);
        });
    }

    start() {
        const port = SettingService.get("port");
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

    route() {
        return {
            get: (path, callback) => {
                this.app.get(path, callback);
            },
            post: (path, callback) => {
                this.app.post(path, callback);
            },
            put: (path, callback) => {
                this.app.put(path, callback);
            },
            destroy: (path, callback) => {
                this.app.delete(path, callback);
            }
        }
    }
}

module.exports = App;
