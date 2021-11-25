import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { resolvers, typeDefs } from './graphDefenition';
import model from '@model';
import express from 'express';
import productRouter from '@router/product.router';
import managerRouter from '@router/manager.router';

const PORT = process.env.SERVER_PORT || 8080;

const { User } = model;

async function serverStart() {
	const app = express();
	app.use(express.json());
	app.use('/', productRouter);
	app.use('/', managerRouter);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req }) => {
			return {
				user: req && req.headers.authorization ? await User.findUserId(req) : null,
				model
			};
		}
	});
	app.use(graphqlUploadExpress());
	await server.start();
	server.applyMiddleware({
		app,
		path: '/api'
	});
	app.listen(PORT, () => {
		console.log(`🚀 Server has been started on port ${PORT}...`);
	});
}

serverStart();