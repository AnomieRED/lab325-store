import { ROLE_ADMIN } from '@role';

export default {
	type: 'mutation',
	name: 'createFeature',
	roleAccess: [ROLE_ADMIN],
	// language=graphql
	typeDef: `
      type Mutation{
          createFeature(id:ID!, title: String!, value:String!): Product
      }
	`,
	resolverFunc: async (parent, args, {
		model: {
			Manager,
			Product,
			Feature
		}
	}) => {
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
		console.log('Create feature resolver: ', boolean);
		await checkProduct.addFeature(newFeature, { through: { value: args.value } });
		return await checkProduct.reload({
			include: [Manager, Feature]
		});
	}
};
