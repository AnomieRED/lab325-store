import Router from 'express';
import Controllers from '@controller/product.controller';

const productRouter = new Router();

productRouter.get('/product', Controllers.getAllProduct);
productRouter.get('/product/:id', Controllers.getOneProduct);
productRouter.get('/products/:id', Controllers.getProductManager);
productRouter.post('/product', Controllers.createProduct);
productRouter.post('/feature/:id', Controllers.addFeature);
productRouter.put('/product/:id', Controllers.editProduct);
productRouter.delete('/product/:id', Controllers.deleteProduct);

export default productRouter;