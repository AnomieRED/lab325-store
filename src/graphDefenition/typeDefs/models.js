// language=graphql
const models = `
		scalar Upload
		
#		type File {
#				url: String
#		}
		
	type Manager {
			id: ID
			name: String
			surname: String
			phone: String
	}

  type Product {
      id: ID
      name: String
      description: String
      price: Float
		  image: String
      availability: ProductEnum
      managerId: Int
      Manager: Manager
      Features: [Feature]
  }

  type Feature {
      id: ID
      title: String
      productFeature: productFeature
  }

  type productFeature {
      id: ID
      value: String
      productId: Int
      featureId: Int
  }
	
#	type Photo {
#      id: ID,
#      fileLocation: String,
#      description: String,
#      tags: String
#	}
`;

export default models;