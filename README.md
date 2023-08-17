# Introduction

<!-- [![Build Status](https://travis-ci.org/codex-academy/BasicExpressWebApp.svg?branch=master)](https://travis-ci.org/codex-academy/BasicExpressWebApp) -->

[![NodeJS CI with PostgreSQL - now](https://github.com/codex-academy/BasicExpressWebApp/actions/workflows/node-pgsql.js.yml/badge.svg)](https://github.com/codex-academy/BasicExpressWebApp/actions/workflows/node-pgsql.js.yml)

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

To deploy the application to Render, create an account here [Render.com](https://dashboard.render.com/login) 
 
Select `Docs` on the navbar. 
 * Next choose node (Express) as you will deploy an express application. 

 Add a start script to your `package.json` file in the `scripts` section.

Add a section like this

 ```
 "start" : "node index.js"
 ```

After adding this is should look like:

```
script : {
    // other scripts
“start” : “node index.js” 
}
```

Create a PostgreSQL database on Render for you app: 

* In the dashboard, click ` New ` button. 
* Choose postgresql. 
* Follow the steps, fill in all the fields accordingly. 

See more info about creating a database on Render: [PostgreSQL with Render](https://render.com/docs/databases#creating-a-database) 

To connect to the Render PostgreSQL database you have just created there are 2 options under `Connections`:

* **Internal Database URL** - use this from within render
* **External Database URL** - use this if you connect to the render database from you PC using `psql`

Connect to the remote database using `psql` using the **External Database URL** using `psql <External Database URL>`

Create a schema called `CRUD` using this command:

```
create schema CRUD;
```
   
> You can read me about PostgreSQL Schemas [here](https://www.postgresqltutorial.com/postgresql-administration/postgresql-schema/).
 
Setup an environment variable in render called `DATABASE_URL`, to allow your app to link to the database on Render.

Do this:

* Inside of you Render app click on `Environment` on the left.
* Set it to the `psql URL` of the database that you created in render.

Note that the application is using two environment variables to be able to deploy to Heroku 

* The PORT number of the app - `process.env.PORT` (Render will set this)
* And the DATABASE_URL the app should use - `process.env.DATABASE_URL` (You need to set this).

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
