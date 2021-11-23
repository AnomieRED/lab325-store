export default {
	type: 'query',
	name: 'getAllManager',
	// language=graphql
	typeDef: `
      type Query{
          getAllManager(limit: Int, offset: Int): [Manager!]!
      }
	`,
	resolverFunc: async (parent, {
		limit,
		offset
	}, { Manager }) => {
		return Manager.findAll({
			limit,
			offset,
			order: [
				['id', 'ASC']
			]
		});
	}
};
