import { prisma } from '../prisma.js';
import { Request, Response } from 'express';

export const getRecords = async (req: Request, res: Response) => {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      firstname: true
    }
  });

  res.json(data);
};