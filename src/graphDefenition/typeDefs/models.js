// language=graphql
const models = `
    scalar Upload

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

    type Token {
        token: String
    }

    type User {
        email: String,
        password: String,
        role: Int
    }
`;

export default models;