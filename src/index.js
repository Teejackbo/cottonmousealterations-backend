require('dotenv').config();
const App = require('./App');
const routes = require("./routes");

const app = new App(routes);
app.start();
