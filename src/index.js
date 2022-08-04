const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const sortMiddleware = require('./app/middlewares/sortMiddleware');
const helpersHandlebar = require('./helpers/handlebars');
const db = require('./config/db');

const app = express();
const port = 5000;

const route = require('./routes');
//connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

/* middleware */
//Dùng khi sử dụng submit bằng form html bootstrap
app.use(express.urlencoded({ extended: true }));
//Dùng khi submit các thư viện như axios, XHLHttpRequest, jquery,fetch
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: helpersHandlebar,
    })
);

app.use(methodOverride('_method'));

//custom middleware
app.use(sortMiddleware);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//init route
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
