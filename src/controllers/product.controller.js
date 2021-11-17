/* eslint-disable */
import client from '@postgres';
import model from '../models/index';
import { validator } from '@validation/validator';

const {
	Product,
	Feature,
	Manager
} = model;

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
				order: [
					['id', 'ASC']
				],
				include: {
					model: Feature,
					attributes: ['title', 'value']
				}
			});
			if (allProducts === null) return res.json('Not found');
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
					model: Feature,
					attributes: ['title', 'value']
				}
			});
			if (oneProduct === null) return res.json('Not found');
			console.log('GET ONE PRODUCT');
			res.status(200)
				.json(oneProduct);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async getProductByManager(req, res) {
		try {
			const {
				offset = 1,
				limit = 10
			} = req.query;
			const { name } = req.body;
			console.log(name);
			if (!name) {
				res.status(404)
					.send({ error: 'Please specify a manager' });
			}
			const oneManager = await Manager.findOne({
				where: {
					name
				},
				include: {
					model: Product,
					attributes: ['id', 'name', 'description', 'price'],
					include: {
						model: Feature,
						attributes: ['title', 'value']
					}
				}
			});
			if (oneManager === null) return res.json('Not found');
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
				title,
				value
			} = req.body;
			if (!title || !value) {
				return res.status(404)
					.send({ error: 'Fields cannot be empty' });
			}
			const check = validator.product({
				name,
				description,
				price,
				managerId
			});
			if (check) {
				return res.status(404)
					.send({ error: check });
			}
			const newProduct = await Product.create({
				name,
				description,
				price,
				managerId
			});
			const newFeature = await Feature.findOrCreate({
				where: {
					title,
					value,
					productId: newProduct.id
				}
			});
			await newProduct.reload({
				include: {
					model: Feature
				}
			});
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
				title,
				value
			} = req.body;
			if (!title || !value) {
				return res.status(404)
					.send({ error: 'Fields cannot be empty' });
			}
			const newFeature = await Feature.create({
				title,
				value,
				productId: productId
			});
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
			const editProduct = await Product.update(update,{
				where: {
					id: productId
				}
			});
			console.log('UPDATE PRODUCT');
			if(editProduct[0] === 1) {
				res.status(200).json('true');
			} else if(editProduct[0] === 0) {
				res.status(200).json('Not found');
			}
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async editFeature(req, res) {
		try {
			const featureId = req.params.id;
			const update = req.body;
			const editFeature = await Feature.update(update, {
				where: {
					id: featureId
				}
			});
			console.log('UPDATE FEATURE');
			if(editFeature[0] === 1) {
				res.status(200).json('true');
			} else if(editFeature[0] === 0) {
				res.status(200).json('Not found');
			}
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