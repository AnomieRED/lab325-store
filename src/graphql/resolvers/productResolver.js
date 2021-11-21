import model from '@model';
import { validator } from '@validation/validator';

const {
	Product,
	Manager
} = model;

const productResolver = {
	productEnum: {
		ON_SALE: 'Product on sale',
		NOT_AVAILABLE: 'Product not available'
	},
	
	Query: {
		async getAllProduct() {
			return Product.findAll({ include: Manager });
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
			return await Product.create({
				name,
				description,
				price,
				availability,
				managerId
			});
		}
	}
};

export default productResolver;