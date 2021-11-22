import model from '@model';
import { validator } from '@validation/validator';

const {
	Product,
	Manager,
	Feature,
	productFeature
} = model;

const productResolver = {
	productEnum: {
		ON_SALE: 'on_sale',
		NOT_AVAILABLE: 'not_available'
	},
	
	Query: {
		async getAllProduct() {
			return await Product.findAll({ include: [Manager, Feature] });
		},
		
		async getOneProduct(_, { id }) {
			const findProduct = await Product.findByPk(id);
			if (!findProduct) throw new Error('Product not found');
			return await Product.findOne({
				where: {
					id
				},
				include: [Manager, Feature]
			});
		}
		
	},
	
	Mutation: {
		async createProduct(_, {
			name,
			description,
			price,
			availability,
			managerId
		}) {
			const check = validator.product({
				name,
				description,
				price,
				managerId
			});
			if (check) throw new Error(check);
			console.log(availability);
			return await Product.create({
				name,
				description,
				price,
				availability,
				managerId
			});
		},
		
		async createFeature(_, args) {
			if (!args.id || !args.title || !args.value) throw new Error('Fields cannot be empty');
			const checkProduct = await Product.findOne({
				where: {
					id: args.id
				}
			});
			console.log(checkProduct);
			const [newFeature, boolean] = await Feature.findOrCreate({
				where: { title: args.title }
			});
			console.log('create feature resolver: ', boolean);
			await checkProduct.addFeature(newFeature, { through: { value: args.value } });
			return await checkProduct.reload({
				include: {
					model: Feature
				}
			});
		},
		
		async editProduct(_, args) {
			const oneProduct = await Product.findByPk(args.id);
			if (!oneProduct) throw new Error('Manager not found');
			const updateProduct = await Product.update(args, {
				where: {
					id: args.id
				}
			});
			if (updateProduct[0] === 1) {
				return 'true';
			} else if(updateProduct[0] === 0) {
				return 'Not Found'
			}
		},
		
		async editFeature(_, args) {
			if (!args.id) throw new Error('Fields cannot be empty');
			const editTitle = await Feature.update(args, {
				where: {
					id: args.id
				}
			});
			const editValue = await productFeature.update(args, {
				where: {
					featureId: args.id
				}
			});
			if (editTitle[0] === 1 || editValue[0] === 1) {
				return 'true';
			} else if (editTitle[0] === 0 || editValue[0] === 0) {
				return 'Not Found';
			}
		},
		
		async deleteProduct(_, { id }) {
			if (!id) throw new Error('Fields cannot be empty');
			const deletedProduct = await Product.destroy({
				where: {
					id
				}
			});
			if (deletedProduct === 1) {
				return 'true';
			} else if (deletedProduct === 0) {
				return 'Not Found';
			}
		}
	}
};

export default productResolver;