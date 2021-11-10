import 'dotenv/config';
import express from 'express';
import '@postgres';
import productRouter from '@router/product.router';
import managerRouter from '@router/manager.router';
import createTable from '@migration';

const app = express();

const PORT = process.env.SERVER_PORT || 8080;

app.use(express.json());
app.use('/', productRouter);
app.use('/', managerRouter);

createTable().then(console.log);
app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
});
