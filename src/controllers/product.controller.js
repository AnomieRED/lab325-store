/* eslint-disable */
import client from '@postgres';
import model from '../models/index';
// import { validator } from '@validation/validator';

const {
	Product,
	Feature
} = model;

// const product = Feature.findOne();

class ProductController {
	async getAllProduct(req, res) {
		try {
			const {
				offset = 0,
				limit = 10
			} = req.query;
			const where = req.body;
			const allProducts = await Product.findAll({
				offset,
				limit,
				where,
				include: {
					model: Feature,
					attributes: ['title', 'value']
				}
			});
			
			if (allProducts.length === 0) return res.json('Not found');
			res.status(200)
				.json(allProducts);
			console.log('GET ALL PRODUCTS');
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async getOneProduct(req, res) {
		try {
			const productId = req.params.id;
			const oneProduct = await Product.findOne({
				where: {
					id: productId
				},
				include: {
					model: ProductFeature,
					attributes: ['id', 'value'],
					include: {
						model: Feature,
						attributes: ['title']
					}
				}
			});
			if (oneProduct.length === 0) return res.json('Not found');
			console.log('GET ONE PRODUCT');
			res.status(200)
				.json(oneProduct);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async getProductManager(req, res) {
		try {
			const {
				offset = 1,
				limit = 10
			} = req.query;
			const name = req.body;
			const oneManager = await Manager.findOne({
				offset,
				limit,
				name,
				include: {
					model: Product,
					attributes: ['id', 'name', 'description', 'price'],
					include: {
						model: ProductFeature,
						attributes: ['value'],
						include: {
							model: Feature,
							attributes: ['title']
						}
					}
				}
			});
			console.log('GET PRODUCT MANAGER');
			res.status(200)
				.json(oneManager);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async createProduct(req, res) {
		try {
			const {
				name,
				description,
				price,
				managerId,
				characterId
			} = req.body;
			
			// if (!title) {
			// 	return res.status(404)
			// 		.send({ error: 'Fields cannot be empty' });
			// }
			// const check = validator.product({
			// 	name,
			// 	description,
			// 	price,
			// 	managerId
			// });
			// if (check) {
			// 	return res.status(404)
			// 		.send({ error: check });
			// }
			const newProduct = await Product.create({
				name,
				description,
				price,
				managerId,
				characterId
			});
			// const newFeature = await Feature.findOrCreate({where: { title } });
			// console.log(newFeature);
			
			// await newProduct.addFeature(newFeature);
			// const newProductFeature = await ProductFeature.create({
			// 	title,
			// 	product_id: newProduct.id,
			// 	feature_id: newFeature.id
			// });
			
			// await newProduct.reload({
			// 	include: {
			// 		model: ProductFeature,
			// 		include: [Feature]
			// 	}
			// });
			// console.log(newProductFeature, newFeature);
			console.log('CREATE PRODUCT');
			res.status(201)
				.json(newProduct);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async addFeature(req, res) {
		try {
			const productId = req.params.id;
			const {
				key,
				value
			} = req.body;
			if (!key || !value) {
				return res.status(404)
					.send({ error: 'Fields cannot be empty' });
			}
			const newFeature = await Feature.create({
				key,
				value
			});
			const addProductFeatures = await client.query(`
			INSERT INTO product_features(product_id, feature_id)
			VALUES(${productId}, ${newFeature.id});
			`);
			console.log(addProductFeatures);
			console.log('ADD FEATURE FOR PRODUCT');
			res.status(201)
				.json(newFeature);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async editProduct(req, res) {
		try {
			const productId = req.params.id;
			const update = req.body;
			const editProduct = await Product.update(productId, update);
			console.log('UPDATE PRODUCT');
			res.status(200)
				.json(editProduct);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async editFeature(req, res) {
		try {
			const featureId = req.params.id;
			const update = req.body;
			const editFeature = await Feature.update(featureId, update);
			console.log('UPDATE FEATURE');
			res.status(200)
				.json(editFeature);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async deleteProduct(req, res) {
		try {
			const productId = req.params.id;
			const deletedProduct = await Product.destroy({
				where: {
					id: productId
				}
			});
			console.log('DELETE PRODUCT');
			res.status(200)
				.json(deletedProduct);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
}

export default new ProductController();