# Introduction

[![Build Status](https://travis-ci.org/codex-academy/BasicExpressWebApp.svg?branch=master)](https://travis-ci.org/codex-academy/BasicExpressWebApp)

This is an example that shows the basics of how to create CRUD screens with NodeJS using ExpressJS and MySQL. CRUD stands for Create, Read, Update and Delete - this is the bread and butter of web application development.

The app is deployed at [https://codex-basic-express-app.herokuapp.com/](https://codex-basic-express-app.herokuapp.com/).

You use CRUD to manage all the data in your web application. Once data is stored it can be retrieved, updated, deleted or whatever your demanding client wants.

I kept this example simple on purpose, but it can be used as the base of something much more complicated.

Fork this repo and clone it into a folder on your laptop and then follow these instructions.

# Setup

To run this example locally you will need to have installed:

* NodeJS version 12+ install it using `nvm`
* npm
* PostgreSQL

You can use apt-get to install all of the above.

## Node JS

You need NodeJs version 14+  install it using [nvm](https://github.com/creationix/nvm) - `nvm install 14`

## Install PostgreSQL

You can install PostgreSQL on Ubuntu using these commands:

```
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

## Database setup

Once you have all the above installed you need to setup the database.

Create a database called `my_products` and username - `coder` with a password of `pg123`. Enter the password when prompted after executing the `createuser` command. 

```
sudo -u postgres createdb my_products;
sudo -u postgres createuser coder -P;
```

Now run *psql* as the *postgres* user:

```
sudo -u postgres psql;
```

Grant the `coder` user access to the `my_products` database by running this command: 

```
grant all privileges on database my_products to coder;
```

Type in `\q` to exit *psql* as the *postgres* user.

Connect to your database using: `psql -d my_products`

## Database setup on Windows

If you are using windows you can create the database and user from within `psql`.


```
create database my_products;
create role coder login password 'coder123';
grant all privileges on database my_products to coder;
```

## Create the database tables

Execute these SQL commands to create the `categories` and `products` table in your database. 

You can copy and paste the script below into psql or your can run the database script inside psql using `\i database.sql`

```sql

create table categories(
	id serial not null primary key,
	description text not null
);

create table products (
	id serial not null primary key,
    description text not null,
	price decimal(10,2),
	category_id int,
	foreign key (category_id) references categories(id)
);
```

> To do this on your own project create sql file containing the table create scripts that's in your projects root folder. Run the scripts using `\i <your script file here>`

You see which tables are in the database by using this command:

```
\dt
```

You can see the columns of a database using this:

```
\d+ <table_name_here>
```

To see all the columns in the products table do this:

```
\d+ products
```

## Use it

Now you should be ready to run the application.

Open a terminal window in the root of the CRUD application and type

`sudo npm install`

This will install all the modules that the application depends on.

To start the application: `node index.js`

If there were no errors, open http://localhost:3000 in a web browser and Create, Read, Update and Delete some products.

Use this as a basis for your own experiments, try to add more tables. Link the tables together using SQL.

The web pages use [handlebar.js templates](http://handlebarsjs.com/)

## Deployment

To deploy the application to Heroku install the Heroku command line utility and create a Heroku account.

Initialize your application as a Heroku app by using: `heroku create`

Create a PostgreSQL database on Heroku for you app using this command: 

```
heroku addons:create heroku-postgresql:hobby-dev
```

See more info about the created database using: `heroku pg:info`

To connect to the PostgreSQL database on Heroku by runnning: 

```heroku pg:psql``` 

Create the `categories` and `products` tables in the Heroku remote database by runnning the script above.

To deploy your app run this command: 

```
git push heroku master
```

Open the deployed app in a browser running this command : 

```
heroku open
```

To see the log files to look for deployment issue use: 

```
heroku logs
```

Note that the application is using two environment variables to be able to deploy to Heroku 

* `process.env.PORT`
* `process.env.DATABASE_URL`

## API basics

Look at the `products-api.js` file in the `api` folder to see how to create an simple API. And API endpoint returns JSON to the client using the HttpResponse Objects `json` method.

```javascript
res.json({
	result: 'success'
})
```

The API end point is running at http://localhost:3000/api/products.

The `client.js` file in the public folder is using the API. It calls the API and renders the resulting JSON data to the screen using HandlebarsJS.

Go to http://localhost:3000/client.html to see the screen using the API in action. It uses [axios](https://github.com/axios/axios) to call the API endpoints using HTTP.
