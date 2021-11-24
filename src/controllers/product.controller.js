/* eslint-disable */
import model from '@model';
import { validator } from '@validation/validator';

const { PATH_IMAGE } = process.env;

const {
	Product,
	Feature,
	Manager,
	productFeature
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
					attributes: ['id', 'title'],
					through: { attributes: ['value'] }
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
			if (!productId) {
				return res.status(404)
					.send({ error: 'Fields cannot be empty' });
			}
			const oneProduct = await Product.findOne({
				where: {
					id: productId
				},
				include: {
					model: Feature,
					attributes: ['id', 'title'],
					through: { attributes: ['value'] }
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
						attributes: ['id', 'title'],
						through: { attributes: ['value'] }
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
	
	async getImage(req, res) {
		try  {
			const productId = req.params.id;
			if (!productId) {
				return res.status(404)
					.send({ error: 'Fields cannot be empty' });
			}
			const findImage = await Product.findOne({
				where: {
					id: productId
				}
			});
			const path = `${PATH_IMAGE}${findImage.image}`;
			console.log(path);
			if(findImage.image === null) {
				return res.status(404).send({error: 'Image not found'});
			} else {
				res.sendFile(path);
			}
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
			const [newFeature, boolean] = await Feature.findOrCreate({ where: { title } });
			
			await newProduct.addFeature(newFeature, { through: { value } });
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
			if (!productId || !title || !value) {
				return res.status(404)
					.send({ error: 'Fields cannot be empty' });
			}
			const checkProduct = await Product.findOne({
				where: {
					id: productId
				}
			});
			console.log(checkProduct);
			const [newFeature, boolean] = await Feature.findOrCreate({
				where: { title }
			});
			await checkProduct.addFeature(newFeature, { through: { value } });
			await checkProduct.reload({
				include: {
					model: Feature
				}
			});
			console.log('ADD FEATURE FOR PRODUCT');
			res.status(201)
				.json(checkProduct);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async editProduct(req, res) {
		try {
			const productId = req.params.id;
			if (!productId) {
				return res.status(404)
					.send({ error: 'Fields cannot be empty' });
			}
			const update = req.body;
			const editProduct = await Product.update(update, {
				where: {
					id: productId
				}
			});
			console.log('UPDATE PRODUCT');
			if (editProduct[0] === 1) {
				res.status(200)
					.json('true');
			} else if (editProduct[0] === 0) {
				res.status(200)
					.json('Not found');
			}
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async editFeature(req, res) {
		try {
			const featureId = req.params.id;
			if (!featureId) {
				return res.status(404)
					.send({ error: 'Fields cannot be empty' });
			}
			const updateFeature = req.body;
			const editTitle = await Feature.update(updateFeature, {
				where: {
					id: featureId
				}
			});
			const editValue = await productFeature.update(updateFeature, {
				where: {
					featureId: featureId
				}
			});
			console.log('UPDATE FEATURE');
			if (editTitle[0] === 1 || editValue[0] === 1) {
				res.status(200)
					.json('true');
			} else if (editTitle[0] === 0 || editValue[0] === 0) {
				res.status(200)
					.json('Not found');
			}
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async deleteProduct(req, res) {
		try {
			const productId = req.params.id;
			if (!productId) {
				return res.status(404)
					.send({ error: 'Fields cannot be empty' });
			}
			const deletedProduct = await Product.destroy({
				where: {
					id: productId
				}
			});
			console.log('DELETE PRODUCT');
			if (deletedProduct === 1) {
				res.status(200)
					.json('true');
			} else if (deletedProduct === 0) {
				res.status(200)
					.json('Not found');
			}
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
}

export default new ProductController();