import { Request, Response } from 'express';
import { prisma } from '../src/prisma.js';

class CarController {
  getRecords = async (req: Request, res: Response) => {
    console.log('CarController');
    try {
      const cars = await prisma.cars.findMany({
        select: {
          id: true,
          model: true,
          brand:    { select: { name: true } },
          category: { select: { name: true } },
        },
      });
      res.json(cars);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente biler' });
    }
  }

  getRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const car = await prisma.cars.findUnique({
        where: { id },
      });
      res.json(car);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente bil' });
    }
  }

  createRecord = async (req: Request, res: Response) => {
    try {
      const { brandId, categoryId, model, year, price, fueltype } = req.body;
      const newCar = await prisma.cars.create({
        data: { brandId, categoryId, model, year, price, fueltype }
      });
      res.json({ id: newCar.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke oprette bil' });
    }
  }

  updateRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { brandId, categoryId, model, year, price, fueltype } = req.body;
      const updatedCar = await prisma.cars.update({
        where: { id },
        data: { brandId, categoryId, model, year, price, fueltype },
      });
      res.json(updatedCar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke opdatere bil' });
    }
  }

  deleteRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deletedCar = await prisma.cars.delete({
        where: { id },
      });
      res.json(deletedCar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke slette bil' });
    }
  }
}

export const carController = new CarController();