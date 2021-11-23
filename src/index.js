import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphDefenition';
import model from '@model'
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
		resolvers,
		context: () => model
	});
	await server.start();
	server.applyMiddleware({ app, path: '/api' });
	app.listen(PORT, () => {
		console.log(`🚀 Server has been started on port ${PORT}...`);
	});
}

serverStart();