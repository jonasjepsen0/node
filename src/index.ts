import express, { Request, Response } from 'express';
import cors from 'cors';
import { carRoutes } from './router/carRouter.js';
import { afdelingRoutes } from './router/afdelingRouter.js';
import { brandRoutes } from './router/brandRouter.js';
import { categoryRoutes } from './router/categoryRouter.js';
import { userRoutes } from './router/userRouter.js';
import { authRoutes } from './router/authRoutes.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 4000;
const port = process.env.PORT || '4000';

app.use(cors());
app.use(express.json());
app.use("/cars", carRoutes);
app.use("/afdeling", afdelingRoutes);
app.use("/brands", brandRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/api", authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.post('/api/echo', (req: Request, res: Response) => {
  res.json({ duSendte: req.body });
});

app.listen(PORT, () => {
  console.log(`Server kører på http://localhost:${PORT}`);
});