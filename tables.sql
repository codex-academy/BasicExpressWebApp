create table categories(
	id serial not null primary key,
	description text not null
);

create table products (
	id serial not null primary key,
    description text not null,
	price decimal(10,2),
	category_id int,
	foreign key (category_id) references categories(id) ON DELETE CASCADE
);

create table users (
	id serial not null primary key,
	username text unique not null,
	password text unique not null,
	createdAt text NOT NULL,
	active boolean not null DEFAULT false
);



alter table categories add constraint uniq_desc_constraint unique(description);
-- alter table users add createdAt DATE NOT NULL DEFAULT CURRENT_DATE unique(description);

