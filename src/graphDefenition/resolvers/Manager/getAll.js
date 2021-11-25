import { ROLE_ADMIN, ROLE_USER } from '@role';

export default {
	type: 'query',
	name: 'getAllManager',
	roleAccess: [ROLE_ADMIN, ROLE_USER],
	// language=graphql
	typeDef: `
      type Query{
          getAllManager(limit: Int, offset: Int): [Manager]
      }
	`,
	resolverFunc: async (parent, {
		limit,
		offset
	}, { user, model: { Manager } }) => {
		if(user === null) return null;
		return Manager.findAll({
			limit,
			offset,
			order: [
				['id', 'ASC']
			]
		});
	}
};
