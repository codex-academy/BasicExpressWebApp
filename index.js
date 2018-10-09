'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Categories = require('./routes/categories');
const CategoriesAPI = require('./api/categories-api');
const Products = require('./routes/products');
const ProductsAPI = require('./api/products-api');

const app = express();
const session = require('express-session');
const flash = require('express-flash');
const CategoryService = require('./services/category-service');
const ProductService = require('./services/product-service');
const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_products';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

const categoryService = CategoryService(pool);
const productService = ProductService(pool);
const categoryRoutes = Categories(categoryService);
const categoryAPI = CategoriesAPI(categoryService);
const productRoutes = Products(productService, categoryService);
const productsAPI = ProductsAPI(productService);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
   
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
app.get('/categories', categoryRoutes.show);
app.get('/categories/add', categoryRoutes.showAdd);
app.get('/categories/edit/:id', categoryRoutes.get);
app.post('/categories/update/:id', categoryRoutes.update);
app.post('/categories/add', categoryRoutes.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/categories/delete/:id', categoryRoutes.delete);

app.get('/', productRoutes.show);
app.get('/products', productRoutes.show);
app.get('/products/edit/:id', productRoutes.get);
app.post('/products/update/:id', productRoutes.update);
app.get('/products/add', productRoutes.showAdd);
app.post('/products/add', productRoutes.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', productRoutes.delete);

app.get('/api/products', productsAPI.all);
app.post('/api/products', productsAPI.add);

app.get('/api/categories', categoryAPI.all);

app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('Create, Read, Update, and Delete (CRUD) example server listening on:', portNumber);
});
