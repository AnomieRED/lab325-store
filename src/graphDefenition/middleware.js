import { skip } from 'graphql-resolvers';
import { AuthenticationError, ApolloError } from 'apollo-server';

export const isAuthenticatedMiddleware = (root, args, { user }) => user ? skip : new AuthenticationError('Not authenticated');

export const Admin = roles => (root, args, { user }) => roles.includes(user.Role.name) ? skip : new ApolloError('Have no permission');