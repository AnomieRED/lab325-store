export default {
	type: 'mutation',
	name: 'updateManager',
	// language=graphql
	typeDef: `
      type Mutation{
          updateManager(id: ID!, name: String, surname:String, phone:String): Boolean
      }
	`,
	resolverFunc: async (parant, args, { Manager }) => {
		const oneManager = await Manager.findByPk(args.id);
		if (!oneManager) throw new Error('Manager not found');
		const updateManager = await Manager.update(args, {
			where: {
				id: args.id
			}
		});
		if (updateManager[0] === 1) return true;
	}
};
