export default {
	type: 'query',
	name: 'getOneProduct',
	// language=graphql
	typeDef: `
      type Query{
          getOneProduct(id: ID!): Product
      }
	`,
	resolverFunc: async (parant, { id }, {
		Manager,
		Product,
		Feature
	}) => {
		const findProduct = await Product.findByPk(id);
		if (!findProduct) throw new Error('Product not found');
		return await Product.findOne({
			where: {
				id
			},
			include: [Manager, Feature]
		});
	}
};
