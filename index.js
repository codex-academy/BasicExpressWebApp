'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Categories = require('./routes/categories');
const Products = require('./routes/products');
const app = express();

const pg = require("pg");

const Pool = pg.Pool;

let useSSL = false;
if (process.env.DATABASE_URL){
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/my_products';
console.log(connectionString);

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

const categories = Categories(pool);
const products = Products(pool);

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

//setup the handlers

app.get('/categories', categories.show);
app.get('/categories/add', categories.showAdd);
app.get('/categories/edit/:id', categories.get);
app.post('/categories/update/:id', categories.update);
app.post('/categories/add', categories.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/categories/delete/:id', categories.delete);

app.get('/', products.show);
app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);

//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', products.delete);

app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('Create, Read, Update, and Delete (CRUD) example server listening on:', portNumber);
});
