create table categories(
	id serial not null primary key,
	description varchar(100) not null
);

create table products (
	id serial not null primary key,
    	description varchar(100) not null,
	price decimal(10,2),
	category_id int,
	foreign key (category_id) references categories(id)
);
