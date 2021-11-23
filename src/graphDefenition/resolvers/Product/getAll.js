export default {
	type: 'query',
	name: 'getAllProduct',
	// language=graphql
	typeDef: `
      type Query{
          getAllProduct(limit: Int, offset: Int): [Product!]!
      }
	`,
	resolverFunc: async (parent, {
		limit,
		offset
	}, {
		Manager,
		Product,
		Feature
	}) => {
		return await Product.findAll({
			limit,
			offset,
			order: [
				['id', 'ASC']
			],
			include: [Manager, Feature]
		});
	}
};


