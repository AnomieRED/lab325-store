import client from '@postgres';

export default async function createTable() {
	
	const manager = await client.query(
		`CREATE TABLE IF NOT EXISTS manager(
  			id SERIAL PRIMARY KEY,
  			name VARCHAR(100) NOT NULL,
				surname VARCHAR(100) NOT NULL,
				phone VARCHAR(50) NOT NULL
			);`
	);
	
	const products = await client.query(
		`CREATE TABLE IF NOT EXISTS products(
  			id SERIAL PRIMARY KEY,
  			name VARCHAR(60) NOT NULL,
				description VARCHAR(255) NOT NULL,
				price INT CHECK(price > 0) NOT NULL,
				manager_id INT,
  			FOREIGN KEY(manager_id) REFERENCES manager(id) ON DELETE CASCADE
			);`
	);
	
	const feature = await client.query(
		`CREATE TABLE IF NOT EXISTS feature(
			id SERIAL PRIMARY KEY,
			value VARCHAR(255) NOT NULL
			);`
	);
	
	const product_features = await client.query(
		`CREATE TABLE IF NOT EXISTS product_features (
			id SERIAL PRIMARY KEY,
			product_id INT NOT NULL,
			feature_id INT NOT NULL,
			name VARCHAR(255) NOT NULL,
			FOREIGN KEY(product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
			FOREIGN KEY(feature_id) REFERENCES feature(id) ON UPDATE CASCADE ON DELETE CASCADE
		);`
	);
	
	console.log(product_features);
	console.log(feature);
	console.log(products);
	console.log(manager);
}