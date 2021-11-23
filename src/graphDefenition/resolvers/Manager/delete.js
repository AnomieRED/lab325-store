export default {
	type: 'mutation',
	name: 'deleteManager',
	// language=graphql
	typeDef: `
      type Mutation{
          deleteManager(id: ID!): Boolean
      }
	`,
	resolverFunc: async (parant, { id }, { Manager }) => {
		const checkManager = await Manager.findByPk(id);
		if (!checkManager) throw new Error('Manager not found');
		console.log(id);
		const deletedManager = await Manager.destroy({
			where: {
				id
			}
		});
		if (deletedManager === 1) return true;
	}
};
