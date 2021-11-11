import client from '@postgres';
import Product from '@models/modelProduct';
import Feature from '@models/modelFeature';
import { validator } from '@validation/validator';

class ProductController {
	async getAllProduct(req, res) {
		try {
			// todo filter by feature
			const { offset = 1, limit = 10 } = req.query;
			const allProducts = await Product.findAll(offset, limit);
			res.status(200).json(allProducts);
			console.log('GET ALL PRODUCTS');
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async getOneProduct(req, res) {
		try {
			const productId = req.params.id;
			const oneProduct = await Product.findById(productId);
			const checkFeature = await client.query(`
			SELECT f.key, f.value
			FROM products as p
			JOIN product_features as pf ON p.id = pf.product_id
			JOIN feature as f ON pf.feature_id = f.id
			JOIN manager as m ON p.manager_id = m.id
			WHERE p.id = ${productId}
			GROUP BY f.key, f.value;
			`);
			if(checkFeature) {
				oneProduct.feature = checkFeature.rows;
			}
			
			console.log('GET ONE PRODUCT');
			res.status(200).json(oneProduct);
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
	
	async createProduct(req, res) {
		try {
			const { name, description, price, manager_id, key, value } = req.body;
			if(!key || !value) {
				return res.status(404).send({ error: 'Fields cannot be empty' });
			}
			const check = validator.product({ name, description, price, manager_id });
			if(check) {
				return res.status(404).send({ error: check });
			}
			const newProduct = await Product.create({ name, description, price, manager_id });
			const newFeature = await Feature.create({ key, value });
			const addFeatureProduct = await client.query(`
			INSERT INTO product_features(product_id, feature_id)
			VALUES(${newProduct.id}, ${newFeature.id});
			`);
			console.log(addFeatureProduct);
			console.log('CREATE PRODUCT');
			res.status(201).json(newProduct);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async addFeature(req, res) {
		try {
			const productId = req.params.id;
			const { key, value } = req.body;
			if(!key || !value) {
				return res.status(404).send({ error: 'Fields cannot be empty' });
			}
			const newFeature = await Feature.create({ key, value });
			const addProductFeatures = await client.query(`
			INSERT INTO product_features(product_id, feature_id)
			VALUES(${productId}, ${newFeature.id});
			`);
			console.log(addProductFeatures);
			console.log('ADD FEATURE FOR PRODUCT');
			res.status(201).json(newFeature);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async editProduct(req, res) {
		try {
			const productId = req.params.id;
			const update = req.body;
			const editProduct = await Product.update(productId, update);
			console.log('UPDATE PRODUCT');
			res.status(200).json(editProduct);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async editFeature(req, res) {
		try {
			const featureId = req.params.id;
			const update = req.body;
			const editFeature = await Feature.update(featureId, update);
			console.log('UPDATE FEATURE');
			res.status(200).json(editFeature);
		} catch(error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async deleteProduct(req, res) {
		try {
			const productId = req.params.id;
			const deletedProduct = await Product.delete(productId);
			const del =
			console.log('DELETE PRODUCT');
			res.status(200).json(deletedProduct);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
}

export default new ProductController();