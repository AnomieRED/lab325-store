import { validator } from '@validation/validator';
import { ROLE_ADMIN } from '@role';

export default {
	type: 'mutation',
	name: 'createManager',
	roleAccess: [ROLE_ADMIN],
	// language=graphql
	typeDef: `
      type Mutation{
          createManager(name: String!, surname: String!, phone:String!): Manager
      }
	`,
	resolverFunc: async (parent, {
		name,
		surname,
		phone
	}, { model: { Manager } }) => {
		const check = validator.manager({
			name,
			surname,
			phone
		});
		if (check) throw new Error(check);
		return await Manager.create({
			name,
			surname,
			phone
		});
	}
};
