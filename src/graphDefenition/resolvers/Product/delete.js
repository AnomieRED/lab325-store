export default {
	type: 'mutation',
	name: 'deleteProduct',
	// language=graphql
	typeDef: `
      type Mutation{
          deleteProduct(id: ID!): String
      }
	`,
	resolverFunc: async (parant, { id }, { Product }) => {
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
};
