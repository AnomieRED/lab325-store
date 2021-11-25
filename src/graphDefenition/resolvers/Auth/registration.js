import bcrypt from 'bcrypt';

export default {
	type: 'mutation',
	name: 'registration',
	// language=graphql
	typeDef: `
      extend type Mutation{
          registration(email:String!, password:String!): User
      }
	`,
	resolverFunc: async (parent, {
		email,
		password
	}, { model: { User } }) => {
		if (!email || !password) throw new Error('Fields cannot be empty');
		const hashPassword = await bcrypt.hash(password, 5);
		return await User.create({
			email,
			password: hashPassword,
			role: 1
		});
	}
};
