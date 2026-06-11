import { Router } from "express";
import { brandController } from "../../controllers/brandController.js";

const routes = Router();

routes.get('/', brandController.getRecords);
routes.get('/:id', brandController.getRecord);
routes.post('/', brandController.createRecord);
routes.put('/:id', brandController.updateRecord);
routes.delete('/:id', brandController.deleteRecord);

export const brandRoutes = routes;