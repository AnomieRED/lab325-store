export default {
	type: 'mutation',
	name: 'editFeature',
	// language=graphql
	typeDef: `
      type Mutation{
          editFeature(id: ID!, title: String, value: String): String
      }
	`,
	resolverFunc: async (parent, args, {
		Feature,
		productFeature
	}) => {
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
	}
};
