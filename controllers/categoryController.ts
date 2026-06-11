import { Request, Response } from 'express';
import { prisma } from '../src/prisma.js';

class CategoryController {
  getRecords = async (req: Request, res: Response) => {
    try {
      const categories = await prisma.category.findMany();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente kategorier' });
    }
  }

  getRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const category = await prisma.category.findUnique({ where: { id } });
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke hente kategori' });
    }
  }

  createRecord = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newCategory = await prisma.category.create({ data: { name } });
      res.json({ id: newCategory.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke oprette kategori' });
    }
  }

  updateRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;
      const updated = await prisma.category.update({
        where: { id },
        data: { name },
      });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke opdatere kategori' });
    }
  }

  deleteRecord = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await prisma.category.delete({ where: { id } });
      res.json(deleted);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kunne ikke slette kategori' });
    }
  }
}

export const categoryController = new CategoryController();