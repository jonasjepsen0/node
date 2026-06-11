import { Router } from "express";
import { userController } from "../../controllers/userController.js";
import { authController } from "../../controllers/authController.js";

const routes = Router();

routes.get('/', userController.getRecords);
routes.get('/:id', userController.getRecord);
routes.post('/', userController.createRecord);
routes.put('/:id', userController.updateRecord);
routes.delete('/:id', userController.deleteRecord);

routes.get(
  "/profile",
  authController.authorize,
  userController.getRecords
);

export const userRoutes = routes;