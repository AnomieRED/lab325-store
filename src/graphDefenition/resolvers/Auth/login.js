export default {
	type: 'mutation',
	name: 'login',
	// language=graphql
	typeDef: `
      extend type Mutation{
          login(email:String!, password:String!): Token
      }
	`,
	resolverFunc: async (parent, {
		email,
		password
	}, { model: { User } }) => {
		const user = await User.findOne({ where: { email } });
		if (!user) throw new Error('User not found');
		
		const valid = user.singIn(password);
		if (!valid) throw new Error('Invalid password');
		
		const token = user.createToken();
		return { token };
	}
};
