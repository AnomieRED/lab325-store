import { gql } from 'apollo-server-express';

const managerType = gql`
	type Manager {
			id: Int!
			name: String!
			surname: String!
			phone: String!
	}
	
	type Query {
		getAllManager: [Manager!]!
		getOneManager(id: ID!): Manager
	}
	
	type Mutation {
			createManager(name: String!, surname: String!, phone:String!): Manager
			updateManager(id: ID!, name: String, surname:String, phone:String): Boolean
			deleteManager(id: ID!): Boolean
	}
`;

export default managerType;