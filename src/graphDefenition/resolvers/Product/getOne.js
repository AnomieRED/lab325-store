import { ROLE_ADMIN, ROLE_USER } from '@role';

export default {
	type: 'query',
	name: 'getOneProduct',
	roleAccess: [ROLE_ADMIN, ROLE_USER],
	// language=graphql
	typeDef: `
      type Query{
          getOneProduct(id: ID!): Product
      }
	`,
	resolverFunc: async (parent, { id }, {
		model: {
			Manager,
			Product,
			Feature
		}
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
