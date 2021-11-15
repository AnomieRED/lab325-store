import 'dotenv/config';
import express from 'express';
// import '@postgres';
import productRouter from '@router/product.router';
import managerRouter from '@router/manager.router';
// import model from '../src/models/index'
// import createTable from '@migration';

// const { Manager } = model;
const app = express();

const PORT = process.env.SERVER_PORT || 8080;

app.use(express.json());
app.use('/', productRouter);
app.use('/', managerRouter);

// Manager.create({ name: 'Olga', surname: 'Stelmax', phone: '380991231' }).then(console.log);

// createTable().then(console.log);
app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
});
