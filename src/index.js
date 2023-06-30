const App = require('./App');
const TestController = require('./controllers/TestController');

const app = new App();
app.start();
app.route().get("/", TestController.test);