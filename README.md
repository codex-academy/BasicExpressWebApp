#Introduction

This is an example that shows the basics of how to create CRUD screens with NodeJS using EpxressJS and MySQL. CRUD stands for Create, Read, Update and Delete - this is the bread and butter of web application development. 

You use CRUD to manage all the data in your web application. Once data is stored it can be retrieved, updated, deleted or whatever your demanding cliet wants.

I kept this example simple on purpose, but it can be used as the base of something much more complicated.

Fork this repo and clone it into a folder on your laptop and then follow these instructions.

#Setup

To run this example locally you will need to have installed
* NodeJS
* npm
* MySql
* A MySQL client - I recommend PHPMyAdmin

You can use apt-get to install all of the above.

##Node JS

Open a terminal window to check if you need to install node & npm, by trying to run these two commands.

On Ubuntu to install node & npm use this commands:
* sudo apt-get install nodejs-legacy
* sudo apt-get install npm

##Install MySQL

Use these instructions to install MySQL & PHP on Ubuntu.

https://www.digitalocean.com/community/tutorials/a-basic-mysql-tutorial

## PhpMyAdmin

You need a tool to administer your database, we will use PhpMyAdmin for that. It's a web application that allows you to administer you database.

Use these instructions to install it:

https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-14-04

## Database setup

Once you have all the above installed you need to setup a database.

To setup the database open a SQL window in PhpMyAdmin and run this sql:

```
CREATE DATABASE my_products;
CREATE USER green_grocer@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON my_products.* TO green_grocer@localhost;
FLUSH PRIVILEGES;
```


Once the database is created execute this SQL command in the database to create the products table. Be sure to run this in the newly created my_products database.

```
create table products (
	id int not null auto_increment,
        description char(100),
        primary key(id)
        
);
```

Once done check if the table was create successfully. You can do that by running this sql command in the my_products database

```
select * from products
```

#Use it

Now you should be ready to run the application.

Open a terminal window in the root of the CRUD application and type

```sudo npm install```

This will install all the modules that the application depends on.

To start the application:

``` node index.js  ```

If there were no errors open http://localhost:3000 in a web browser and Create, Read, Update and Delete some products.

Use this as a basis for your own experiments, try to add more tables - link the tables together using SQL.

The web pages use handlebar.js templates (http://handlebarsjs.com/) it's an extension of moustache (http://mustache.github.io/)
