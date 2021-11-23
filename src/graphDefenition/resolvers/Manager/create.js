import { validator } from '@validation/validator';

export default {
	type: 'mutation',
	name: 'createManager',
	// language=graphql
	typeDef: `
      type Mutation{
          createManager(name: String!, surname: String!, phone:String!): Manager
      }
	`,
	resolverFunc: async (parant, {
		name,
		surname,
		phone
	}, { Manager }) => {
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
