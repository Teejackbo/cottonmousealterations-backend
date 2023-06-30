const express = require('express');
const settings = require("./settings");

class App {
    constructor() {
        this.app = express();
    }

    start() {
        this.app.listen(settings.port, () => {
            console.log(`Server is running on port ${settings.port}`);
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
