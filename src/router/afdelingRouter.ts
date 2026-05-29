import { Router, Request, Response } from "express";

  const routes = Router();

  routes.get('/', (req: Request, res: Response) => {
    res.send('afdelinger');
  });

  routes.get('/afdelinger/:landsdel', (req: Request, res: Response) => {
    res.send(`landsdel ${req.params.landsdel}`);
  });

  export const afdelingRoutes = routes; 