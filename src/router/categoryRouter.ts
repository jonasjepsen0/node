import { Router } from "express";
import { categoryController } from "../../controllers/categoryController.js";

const routes = Router();

routes.get('/', categoryController.getRecords);
routes.get('/:id', categoryController.getRecord);
routes.post('/', categoryController.createRecord);
routes.put('/:id', categoryController.updateRecord);
routes.delete('/:id', categoryController.deleteRecord);

export const categoryRoutes = routes;