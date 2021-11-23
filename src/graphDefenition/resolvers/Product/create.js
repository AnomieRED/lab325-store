import { validator } from '@validation/validator';

export default {
	type: 'mutation',
	name: 'createProduct',
	// language=graphql
	typeDef: `
      type Mutation{
          createProduct(name: String!, description: String!, price: Float!, title:String!, value:String!, availability: ProductEnum!, managerId: Int!): Product
      }
	`,
	resolverFunc: async (parant, {
		name,
		description,
		price,
		title,
		value,
		availability,
		managerId
	}, {
		Manager,
		Product,
		Feature
	}) => {
		if (!title || !value) throw new Error('Fields cannot be empty');
		const check = validator.product({
			name,
			description,
			price,
			managerId
		});
		if (check) throw new Error(check);
		const newProduct = await Product.create({
			name,
			description,
			price,
			availability,
			managerId
		});
		const [newFeature, boolean] = await Feature.findOrCreate({ where: { title } });
		console.log('Create product resolver: ', boolean);
		await newProduct.addFeature(newFeature, { through: { value } });
		await newProduct.reload({
			include: [Manager, Feature]
		});
		return newProduct;
	}
};
