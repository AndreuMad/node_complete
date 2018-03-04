const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const middleware = require('./middlewares/middleware').middleware;

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentDate', () => new Date());
hbs.registerHelper('generateText', text => `Generated text: ${text}`);
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  const log = `method: ${req.method}, ulr: ${req.url}`;
  fs.appendFile(`${__dirname}/server.log`, log, (error) => {
    error && console.log(error);
  });
  next();
});

app.get('/', (req, res) => {
  res.send({
    name: 'Andrii',
    age: 21
  });
});

app.get('/about', (req, res) => {
  res.render(`${__dirname}/views/about.hbs`, {
    text: 'Some text'
  });
});

app.get('/middleware', middleware, (req, res) => {
  res.render(`${__dirname}/views/middleware.hbs`, {
    textMiddleware: 'Last stage'
  });
});

app.listen(3000);
