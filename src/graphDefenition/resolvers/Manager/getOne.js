export default {
	type: 'query',
	name: 'getOneManager',
	// language=graphql
	typeDef: `
      type Query{
          getOneManager(id: ID!): Manager
      }
	`,
	resolverFunc: async (parent, { id }, { Manager }) => {
		const oneManager = await Manager.findByPk(id);
		if (!oneManager) throw new Error('Manager not found');
		return oneManager;
	}
};
