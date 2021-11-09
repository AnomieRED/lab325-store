//todo join на получение товара с фильтрацией на характеристикам товара
--SELECT film_id, title, description, REGEXP_MATCHES(description, 'Cat | Dog ') cat_or_dog FROM film ORDER BY title;

WITH add_product as (INSERT INTO products(name, description, price, manager_id) VALUES('Table', 'For computer', 3000, 1) RETURNING id),
add_feature as (INSERT INTO feature(key, value) VALUES('Height', '85cm') RETURNING id),
add_product_feature as (INSERT INTO product_features(product_id, feature_id) VALUES((SELECT id FROM add_product), (SELECT id FROM add_feature)) RETURNING id)
SELECT add_product.name, add_product.description, add_product.price, add_product.manager_id FROM add_product_feature inner join add_product on add_product_features.product_id = add_product.id WHERE product_features.id = (SELECT id FROM add_product_features);

--MULTI UPDATE
WITH update_product as (UPDATE products SET name = 'DMC', description = 'Test test', price = 3222 WHERE id = 4 RETURNING *),
update_feature as (UPDATE feature SET key = 'Test3', value = 'Test' WHERE id = (SELECT id FROM update_product))
SELECT name, description, price, key, value FROM update_product JOIN product_features ON update_product.id = product_features.product_id
JOIN feature ON product_features.feature_id = feature.id WHERE update_product.id = (SELECT id FROM update_product);


--MULTI CREATE
WITH add_product as (INSERT INTO products(name, description, price, manager_id) VALUES('table 111', 'bla bla', 322, 1) RETURNING *),
add_feature as (INSERT INTO feature(key, value) VALUES('material 6', 'metal') RETURNING *),
add_product_features as (INSERT INTO product_features(product_id, feature_id) VALUES((SELECT id FROM add_product), (SELECT id FROM add_feature)) RETURNING *)
SELECT add_product.name, add_product.description, add_product.price, add_feature.key, add_feature.value, add_product.manager_id FROM add_product_features
JOIN add_product ON add_product_features.product_id = add_product.id
JOIN add_feature ON add_product_features.feature_id = add_feature.id WHERE add_product.id = (select id from add_product);

--MULTI DELETE
WITH dp as (DELETE FROM products WHERE id = 7 RETURNING *),
f as (DELETE FROM feature WHERE id = 7 RETURNING *)
SELECT dp.name, dp.description, dp.price, f.key, f.value FROM dp JOIN product_features as pf ON dp.id = pf.product_id
JOIN feature as f ON f.id = pf.feature_id;

--MULTI ADD FEATURE TO PRODUCT
WITH add_feature as (INSERT INTO feature(key, value) VALUES($1, $2) RETURNING *),
add_product_feature as (INSERT INTO product_features(product_id, feature_id)
VALUES($3, (SELECT id FROM add_feature)))
SELECT add_feature.key, add_feature.value FROM add_feature
WHERE add_feature.id = (SELECT id FROM add_feature);

--AGG for feature FOR ONE
SELECT products.id, products.name, description, price, manager_id,
concat_ws(' ', manager.name, manager.surname) as manager,
json_object_agg(feature.key, value) as characteristics
FROM products
INNER JOIN product_features
ON products.id = product_features.product_id
INNER JOIN feature
ON product_features.feature_id = feature.id
INNER JOIN manager
ON products.id = manager.id
group by products.id, manager.surname, manager.name, products.name;

--AGG for feature FOR ALL
SELECT p.id, p.name, p.description, p.price, p.manager_id,
concat_ws(' ', m.name, m.surname) as manager,
json_object_agg(f.key, f.value) as feature
FROM products as p
JOIN product_features as pf ON p.id = pf.product_id
JOIN feature as f ON pf.feature_id = f.id
JOIN manager as m ON p.manager_id = m.id
GROUP BY p.id, p.name, m.name, m.surname;

--GET Product by id manager
SELECT m.id, concat_ws(' ', m.name, m.surname) as manager, m.phone,
p.id, p.name, p.description, p.price,
json_object_agg(f.key, f.value) as feature
FROM manager as m
JOIN products as p ON m.id = p.manager_id
JOIN product_features as pf ON p.id = pf.product_id
JOIN feature as f ON f.id = pf.feature_id
WHERE m.id = 1 GROUP BY m.id, p.id, m.name, m.surname, m.phone, p.name;

--REMOVING Feature from a product

delete from feature where id in (select f.id from feature as f join product_features as pf on f.id = pf.feature_id where pf.product_id = 1) returning *

--delete from product_features where id in (select pf.feature_id from products as p join product_features as pf on p.id = pf.product_id where p.id = 2);

WITH dp as (DELETE FROM products WHERE id = 4 RETURNING *),
f as (delete from feature where id in (select f.id from feature as f join product_features as pf on f.id = pf.feature_id where pf.product_id = 4) returning *),
pf as (delete from product_features where id in (select pf.feature_id from products as p join product_features as pf on p.id = pf.product_id where p.id = 4))
SELECT dp.name, dp.description, dp.price,
json_object_agg(f.key, f.value)
FROM dp
JOIN product_features as pf ON dp.id = pf.product_id
JOIN feature as f ON f.id = pf.feature_id;


---

SELECT p.id, p.name, p.description, p.price, p.manager_id,
concat_ws(' ', m.name, m.surname) as manager,
json_object_agg(f.key, f.value) as features
FROM products as p
JOIN product_features as pf ON p.id = pf.product_id
JOIN feature as f ON pf.feature_id = f.id
JOIN manager as m ON p.manager_id = m.id
GROUP BY p.id, p.name, m.name, m.surname

with filter_all_products as (
SELECT p.id, p.name, p.description, p.price, p.manager_id,
concat_ws(' ', m.name, m.surname) as manager,
json_object_agg(f.key, f.value) as features
FROM products as p
JOIN product_features as pf ON p.id = pf.product_id
JOIN feature as f ON pf.feature_id = f.id
JOIN manager as m ON p.manager_id = m.id
GROUP BY p.id, p.name, m.name, m.surname)
select * from filter_all_products where features->>'green' = '5kg'
LIMIT 10 OFFSET 1;