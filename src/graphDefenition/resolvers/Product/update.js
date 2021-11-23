export default {
	type: 'mutation',
	name: 'updateProduct',
	// language=graphql
	typeDef: `
      type Mutation{
          updateProduct(id: ID!, name: String, description: String, price: Float, availability: ProductEnum, managerId: Int): String
      }
	`,
	resolverFunc: async (parant, args, { Product }) => {
		const oneProduct = await Product.findByPk(args.id);
		if (!oneProduct) throw new Error('Manager not found');
		const updateProduct = await Product.update(args, {
			where: {
				id: args.id
			}
		});
		if (updateProduct[0] === 1) {
			return 'true';
		} else if (updateProduct[0] === 0) {
			return 'Not Found';
		}
	}
};
