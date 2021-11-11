import client from '@postgres';
import Product from '@models/modelProduct';
import Feature from '@models/modelFeature';
import Schema from '@schema/productSchema';
import Validator from 'fastest-validator';
const fastValidator = new Validator();

class ProductController {
	async getAllProduct(req, res) {
		try {
			// todo сделать фильтрацию по характеристикам
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
	
	// todo add many products??
	async createProduct(req, res) {
		try {
			const { name, description, price, manager_id, key, value } = req.body;
			if(!key || !value) {
				return res.status(404).json('Fields cannot be empty');
			}
			const check = fastValidator.compile(Schema);
			let validate = check({ name, description, price, manager_id });
			console.log(validate);
			if(validate !== true) {
				return res.status(404).send({ error: validate[0].message });
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
				return res.status(404).json('Fields cannot be empty');
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
			const { name, description, price } = req.body;
			const editProduct = await Product.update(productId, { name, description, price });
			console.log('UPDATE PRODUCT');
			res.status(200).json(editProduct);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async deleteProduct(req, res) {
		try {
			const productId = req.params.id;
			const deletedProduct = await Product.delete(productId);
			console.log('DELETE PRODUCT');
			res.status(200).json(deletedProduct);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
}

export default new ProductController();