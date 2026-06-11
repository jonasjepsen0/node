import { Router, Request, Response } from "express";
  import { carController } from "../../controllers/carController.js";

  const routes = Router();

  routes.get('/', (req: Request, res: Response) => {
    res.send('liste over biler');
  });

  routes.get('/:type/:carId', (req: Request, res: Response) => {
    res.send(`bil detaljer for id ${req.params.carId} og typen ${req.params.type}`);
  });

  routes.get('/list', carController.getRecords);

  routes.get('/:id', carController.getRecord);

  routes.post('/', carController.createRecord);

  routes.put('/:id', carController.updateRecord);

  routes.delete('/:id', carController.deleteRecord);

  export const carRoutes = routes;