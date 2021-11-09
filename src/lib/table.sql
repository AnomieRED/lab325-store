CREATE TABLE products(
	id SERIAL PRIMARY KEY,
	name VARCHAR(60) NOT NULL,
	description VARCHAR(255) NOT NULL,
	price INT CHECK(price >0) NOT NULL
);

CREATE TABLE feature(
	id SERIAL PRIMARY KEY,
	key VARCHAR(255) NOT NULL,
	value VARCHAR(255) NOT NULL, --todo: поменять на key - ключи хранятся отдельно
	--fixme: добавить key
)

CREATE TABLE product_feature(
	id SERIAL PRIMARY KEY,
	product_id INT NOT NULL,
	feature_id INT NOT NULL,
	key VARCHAR(255) NOT NULL, --todo: поменять на value - это значение /// fixme: убрать значение key
	FOREIGN KEY(product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(feature_id) REFERENCES feature(id) ON UPDATE CASCADE ON DELETE CASCADE
);

select p.name, p.description, p.price, f.key, f.value from products as p
inner join product_feature as pf on p.id = pf.product_id
inner join feature as f on f.id = feature_id
where f.key = 'Ryzen' and f.value = 'Color';

--Для третий таблицы создать отдельный роут *Админский* для добавления в feature_product
--В product.controller сделать создание продукта с помощью with ... as (), () from ... 

--1.Заполняем таблицу менеджеров
--2.Заполняем таблицу с характеристиками
--3.Заполняем таблицу feature_product

insert into feature(key, value) values('Height', '85cm');
-------

insert into feature(value) values('CPU');
insert into feature(value) values('Color');
insert into feature(value) values('Diagonal');
insert into feature(value) values('Brightness');

insert into products(name, description, price) values('Table', 'For computer', 3000);
insert into products(name, description, price) values('Computer', 'For office', 8000);
insert into products(name, description, price) values('Phone', 'For call', 7000);
insert into products(name, description, price) values('Monitor', 'For office', 4000);
insert into products(name, description, price) values('Lamp', 'For table', 500);


insert into product_feature(product_id, feature_id) values(1, 1);
-------

insert into product_feature(product_id, feature_id, key) values(1, 1, '85cm');
insert into product_feature(product_id, feature_id, key) values(2, 2, 'Ryzen');
insert into product_feature(product_id, feature_id, key) values(2, 2, 'Ryzen');
insert into product_feature(product_id, feature_id, key) values(2, 2, 'Ryzen');

insert into product_feature(product_id, feature_id, key) values(3, 3, 'Intel');
insert into product_feature(product_id, feature_id, key) values(2, 2, 'Data');

insert into product_feature(product_id, feature_id, key) values(3, 3, 'Black');
insert into product_feature(product_id, feature_id, key) values(4, 4, '24');
insert into product_feature(product_id, feature_id, key) values(5, 5, '25watts');
