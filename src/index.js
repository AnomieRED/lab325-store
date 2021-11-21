import 'dotenv/config';
import express from 'express';
import productRouter from '@router/product.router';
import managerRouter from '@router/manager.router';

const app = express();

const PORT = process.env.SERVER_PORT || 8080;

app.use(express.json());
app.use('/', productRouter);
app.use('/', managerRouter);

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
});
