const { SERVER_PORT } = process.env

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
		const allProduct = await Product.findAll({
			limit,
			offset,
			order: [
				['id', 'ASC']
			],
			include: [Manager, Feature]
		});
		allProduct.forEach(product => {
			if(product.image === null) return
			product.image = `http://localhost:${SERVER_PORT}${product.image}`
		});
		return allProduct;
	}
};


