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
    }

    type Managers {
        id: Int!
        name: String!
        surname: String!
        phone: String!
    }

    type Query {
        getAllProduct: [Product!]
    }

    type Mutation {
        createProduct(name: String!, description: String!, price: Float!, availability: productEnum!, managerId: Int!): Product
    }
`;

export default productType;