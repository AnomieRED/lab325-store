import client from '@postgres';

class ProductController {
	async getAllProduct(req, res) {
		try {
			// todo сделать фильтрацию по характеристикам
			const { offset = 1, limit = 10 } = req.query;
			const allProducts = await client.query(
				`SELECT p.id, p.name, p.description, p.price, p.manager_id,
				concat_ws(' ', m.name, m.surname) as manager,
				json_object_agg(f.key, f.value) as features
				FROM products as p
				JOIN product_features as pf ON p.id = pf.product_id
				JOIN feature as f ON pf.feature_id = f.id
				JOIN manager as m ON p.manager_id = m.id
				GROUP BY p.id, p.name, m.name, m.surname
				LIMIT $2 OFFSET (($1 - 1) * $2);`,
				[offset, limit]
			);
			console.log('GET ALL PRODUCTS');
			res.status(200).json(allProducts.rows);
			res.status(200).json('OK');
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async getOneProduct(req, res) {
		try {
			const productId = req.params.id;
			if (!productId) {
				return res.status(400).json('Check your product ID');
			}
			const oneProduct = await client.query(`
				SELECT p.id, p.name, p.description, p.price, p.manager_id,
				concat_ws(' ', m.name, m.surname) as manager,
				json_object_agg(f.key, f.value) as features
				FROM products as p
				JOIN product_features as pf ON p.id = pf.product_id
				JOIN feature as f ON pf.feature_id = f.id
				JOIN manager as m ON p.manager_id = m.id
				WHERE p.id = $1
				GROUP BY p.id, p.name, m.name, m.surname;`, [productId]
			);
			console.log('GET ONE PRODUCT');
			res.status(200).json(oneProduct.rows[0]);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async getProductManager(req, res) {
		try {
			const managerId = req.params.id;
			const { offset = 1, limit = 10 } = req.query;
			const product = await client.query(
				`SELECT m.id, concat_ws(' ', m.name, m.surname) as manager, m.phone,
				p.id, p.name, p.description, p.price,
				json_object_agg(f.key, f.value) as features
				FROM manager as m
				JOIN products as p ON m.id = p.manager_id
				JOIN product_features as pf ON p.id = pf.product_id
				JOIN feature as f ON f.id = pf.feature_id
				WHERE m.id = $3 GROUP BY m.id, p.id, m.name, m.surname, m.phone, p.name
				LIMIT $2 OFFSET (($1 - 1) * $2);`,
				[offset, limit, managerId]
			);
			console.log('GET PRODUCT MANAGER');
			res.status(200).json(product.rows);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	// todo add many products??
	async createProduct(req, res) {
		try {
			const { name, description, price, manager_id, key, values } = req.body;
			
const newProduct = await client.query(`
				WITH add_product as (INSERT INTO products(name, description, price, manager_id) VALUES($1, $2, $3, $4) RETURNING *),
				add_feature as (INSERT INTO feature(key, value) VALUES($5, $6) RETURNING *),
				add_product_features as (INSERT INTO product_features(product_id, feature_id) VALUES((SELECT id FROM add_product), (SELECT id FROM add_feature)) RETURNING *)
				SELECT add_product.id, add_product.name, add_product.description, add_product.price, add_feature.key, add_feature.value, add_product.manager_id FROM add_product_features
				JOIN add_product ON add_product_features.product_id = add_product.id
				JOIN add_feature ON add_product_features.feature_id = add_feature.id
				WHERE add_product.id = (select id from add_product);`,
				[name, description, price, manager_id, key, values]
			);
			console.log('CREATE PRODUCT');
			res.status(201).json(newProduct.rows[0]);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async addFeature(req, res) {
		try {
			const productId = req.params.id;
			if (!productId) {
				return res.status(400).json('Check your product ID');
			}
			const { key, value } = req.body;
			const newFeature = await client.query(`
			WITH add_feature as (INSERT INTO feature(key, value) VALUES($1, $2) RETURNING *),
			add_product_feature as (INSERT INTO product_features(product_id, feature_id)
			VALUES($3, (SELECT id FROM add_feature)))
			SELECT add_feature.key, add_feature.value FROM add_feature
			WHERE add_feature.id = (SELECT id FROM add_feature);`,
				[key, value, productId]
			);
			console.log('ADD FEATURE FOR PRODUCT');
			res.status(201).json(newFeature.rows[0]);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async editProduct(req, res) {
		try {
			const productId = req.params.id;
			const { name, description, price, key, value } = req.body;
			if (!productId) {
				res.status(400).json('Check your product ID');
			}
			const editProduct = await client.query(`
				WITH update_product as (UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *),
				update_feature as (UPDATE feature SET key = $5, value = $6
				WHERE id = (SELECT id FROM update_product))
				SELECT name, description, price, key, value FROM update_product
				JOIN product_features ON update_product.id = product_features.product_id
				JOIN feature ON product_features.feature_id = feature.id
				WHERE update_product.id = (SELECT id FROM update_product);`,
				[name, description, price, productId, key, value]
			);
			console.log('UPDATE PRODUCT');
			res.status(200).json(editProduct.rows[0]);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async deleteProduct(req, res) {
		try {
			const productId = req.params.id;
			if (!productId) {
				return res.status(400).json('Check product id');
			}
			// todo добавить удаление товара с характеристиками / удаление характеристики у товара
			const deletedProduct = await client.query(`
				WITH dp as (DELETE FROM products WHERE id = $1 RETURNING *),
				f as (delete from feature where id in (select f.id from feature as f join product_features as pf on f.id = pf.feature_id where pf.product_id = $1) returning *),
				pf as (delete from product_features where id in (select pf.feature_id from products as p join product_features as pf on p.id = pf.product_id where p.id = $1))
				SELECT dp.id, dp.name, dp.description, dp.price,
				json_object_agg(f.key, f.value) as features
				FROM dp
				JOIN product_features as pf ON dp.id = pf.product_id
				JOIN feature as f ON f.id = pf.feature_id
				GROUP BY dp.id, dp.name, dp.description, dp.price;`, [productId]
			);
			console.log('DELETE PRODUCT');
			res.status(200).json(deletedProduct.rows[0]);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
}

export default new ProductController();