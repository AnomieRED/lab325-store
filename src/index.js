import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/schemas';
import resolvers from './graphql/resolvers';
import express from 'express';
import productRouter from '@router/product.router';
import managerRouter from '@router/manager.router';

const PORT = process.env.SERVER_PORT || 8080;

async function serverStart() {
	const app = express();
	app.use(express.json());
	app.use('/', productRouter);
	app.use('/', managerRouter);
	const server = new ApolloServer({
		typeDefs,
		resolvers
	});
	await server.start();
	server.applyMiddleware({ app, path: '/api' });
	app.listen(PORT, () => {
		console.log(`🚀 Server has been started on port ${PORT}...`);
	});
}

serverStart();