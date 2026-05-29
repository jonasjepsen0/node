import { Router, Request, Response } from "express";

  const routes = Router();

  routes.get('/', (req: Request, res: Response) => {
    res.send('liste over biler');
  });

  routes.get('/:type/:carId', (req: Request, res: Response) => {
    res.send(`bil detaljer for id ${req.params.carId} og typen ${req.params.type}`);
  });

  export const carRoutes = routes; 