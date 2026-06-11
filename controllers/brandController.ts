import { Request, Response } from 'express';
import { prisma } from '../src/prisma.js';

class BrandController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const brands = await prisma.brand.findMany();
      res.json(brands);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente brands' });
    }
  }

  getRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const brand = await prisma.brand.findUnique({ where: { id } });
      res.json(brand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente brand' });
    }
  }

  createRecord = async (req: Request, res: Response) => {
    try {
      const { name, logo } = req.body;
      const newBrand = await prisma.brand.create({ data: { name, logo } });
      res.json({ id: newBrand.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke oprette brand' });
    }
  }

  updateRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { name, logo } = req.body;
      const updated = await prisma.brand.update({
        where: { id },
        data: { name, logo },
      });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke opdatere brand' });
    }
  }

  deleteRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await prisma.brand.delete({ where: { id } });
      res.json(deleted);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke slette brand' });
    }
  }
}

export const brandController = new BrandController();