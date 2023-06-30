const express = require('express');
const settings = require("./settings");

class App {
    constructor() {
        this.app = express();
        this.app.get('/', (req, res) => res.send('Hello World!'));
    }

    start() {
        this.app.listen(settings.port, () => {
            console.log(`Server is running on port ${settings.port}`);
        });
    }
}

module.exports = App;
