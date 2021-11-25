import { ROLE_ADMIN, ROLE_USER } from '@role';

export default {
	type: 'query',
	name: 'getOneManager',
	roleAccess: [ROLE_ADMIN, ROLE_USER],
	// language=graphql
	typeDef: `
      type Query{
          getOneManager(id: ID!): Manager
      }
	`,
	resolverFunc: async (parent, { id }, { model: { Manager } }) => {
		const oneManager = await Manager.findByPk(id);
		if (!oneManager) throw new Error('Manager not found');
		return oneManager;
	}
};
