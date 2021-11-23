// language=graphql
const models = `
	type Manager {
			id: ID!
			name: String!
			surname: String!
			phone: String!
	}

  type Product {
      id: ID!
      name: String!
      description: String!
      price: Float!
      availability: ProductEnum!
      managerId: Int!
      Manager: Manager
      Features: [Feature]
  }

  type Feature {
      id: ID
      title: String!
      productFeature: productFeature
  }

  type productFeature {
      id: ID!
      value: String!
      productId: Int!
      featureId: Int!
  }
`;

export default models;