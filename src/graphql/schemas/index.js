import { gql } from 'apollo-server-express';
import managerType from './managerType';
import productType from './productType';

const rootType = gql`
    type Query {
        root: String
    }
    type Mutation {
        root: String
    }

`;

export default [rootType, managerType, productType];
