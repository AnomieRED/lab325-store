import Router from 'express';
import Controllers from '@controller/manager.controller';

const managerRouter = new Router();

managerRouter.get('/manager', Controllers.getManagerByProduct);
managerRouter.get('/manager/:id', Controllers.getOneManager);
managerRouter.post('/manager', Controllers.createManager);
managerRouter.put('/manager/:id', Controllers.updateManager);
managerRouter.delete('/manager/:id', Controllers.deleteManager);

export default managerRouter;