import { gql } from 'apollo-server-express';

const productType = gql`
    
    enum productEnum {
        ON_SALE
        NOT_AVAILABLE
    }

    type Product {
        id: Int!
        name: String!
        description: String!
        price: Float!
        availability: productEnum!
        managerId: Int!
        Manager: Manager
        Features: [Feature]
    }

    type Managers {
        id: Int!
        name: String!
        surname: String!
        phone: String!
    }
    
    type Feature {
        id: Int!
        title: String!
        productFeature: productFeature
    }
    
    type productFeature {
        id: Int!
        value: String!
        productId: Int!
        featureId: Int!
    }

    type Query {
        getAllProduct: [Product]
        getOneProduct(id: Int!): Product
    }

    type Mutation {
        createProduct(name: String!, description: String!, price: Float!, availability: productEnum!, managerId: Int!): Product
        createFeature(id:ID!, title: String!, value:String!): Product
        editProduct(id: ID!, name: String, description: String, price: Float, availability: productEnum, managerId: Int): String
        editFeature(id: ID!, title: String, value: String): String
        deleteProduct(id: ID!): String
    }
`;

export default productType;