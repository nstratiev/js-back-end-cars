const express = require('express');
const hbs = require('express-handlebars');

const carsService = require('./services/cars.js');

const { about } = require('./controllers/about.js');
const create = require('./controllers/create.js');
const { details } = require('./controllers/details.js');
const { home } = require('./controllers/home.js');
const { notFound } = require('./controllers/notFound.js');

const app = express();

const handlebars = hbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true })); // (Body parser) Вграден в Express middleware
app.use('/static', express.static('./static'));
app.use(carsService());

app.get('/', home);
app.get('/about', about);
app.route('/create')
    .get(create.get)
    .post(create.post);
app.get('/details/:id', details);
app.all('*', notFound);
// app.get('*', notFound, { title: 'Page Not Found' });

app.listen(3000, () => console.log('Listening on port 3000 ...'));