#Introduction

This is an example that shows the basics of how to create CRUD screens with NodeJS using ExpressJS and MySQL. CRUD stands for Create, Read, Update and Delete - this is the bread and butter of web application development.

You use CRUD to manage all the data in your web application. Once data is stored it can be retrieved, updated, deleted or whatever your demanding client wants.

I kept this example simple on purpose, but it can be used as the base of something much more complicated.

Fork this repo and clone it into a folder on your laptop and then follow these instructions.

#Setup

To run this example locally you will need to have installed
* NodeJS
* npm
* MySQL
* A MySQL client - I recommend phpMyAdmin

You can use apt-get to install all of the above.

##Node JS

Open a terminal window to check if you need to install node & npm by trying to run these two commands.

On Ubuntu to install node & npm use this commands:
* sudo apt-get install nodejs-legacy
* sudo apt-get install npm

##Install MySQL

Use these instructions to install MySQL & PHP on Ubuntu.

https://www.digitalocean.com/community/tutorials/a-basic-mysql-tutorial

## phpMyAdmin

You need a tool to administer your database. We will use phpMyAdmin for that. It's a web application that allows you to administer your database.

Use these instructions to install it:

https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-14-04

> If you have trouble running phpMyAdmin locally after the installation it is most likely due to the fact that you didn't select the install options for Apache. When given the option to install to Apache config for phpMyAdmin you need to select it explicitly using the spacebar. But all is not lost - reconfigure Apache and phpMyAdmin by using this command ```sudo dpkg-reconfigure phpMyAdmin``` on the command line. Be sure to select Apache this time around!

## Database setup

Once you have all the above installed you need to setup the database.

To setup the database open a SQL window in phpMyAdmin and run this SQL:

```sql
CREATE DATABASE my_products;
CREATE USER green_grocer@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON my_products.* TO green_grocer@localhost;
FLUSH PRIVILEGES;
```

After creating the database execute this SQL command to create the `categories` and `products` table. Be sure to run this in the newly created `my_products` database.

```sql
use my_products;

create table categories(
	id int primary key auto_increment,
	description char(100) not null
);

create table products (
	id int primary key auto_increment,
        description char(100) not null,
	price decimal(10,2),
	category_id int,
	foreign key (category_id) references categories(id)
);
```

Now check if the tables were create successfully. You can do that by running these SQL commands in the `my_products` database

```
select * from categories;
select * from products;
```

> If you already have a products table and it doesn't have a category_id column, run this SQL to add it:

> ```ALTER TABLE products ADD category_id INT;```

#Use it

Now you should be ready to run the application.

Open a terminal window in the root of the CRUD application and type

`sudo npm install `

This will install all the modules that the application depends on.

To start the application: `node index.js`

If there were no errors, open http://localhost:3000 in a web browser and Create, Read, Update and Delete some products.

Use this as a basis for your own experiments, try to add more tables. Link the tables together using SQL.

The web pages use [handlebar.js templates](http://handlebarsjs.com/), an extension of [mustache](http://mustache.github.io/).
