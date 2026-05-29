// Importerer Express frameworket
import express from "express";

// Importerer den genererede Prisma Client
import { PrismaClient } from "./generated/prisma/client.js";

// Importerer SQLite adapteren til Prisma 7
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Opretter forbindelse til SQLite databasen
const adapter = new PrismaBetterSqlite3({
  // Henter database URL fra .env filen
  url: process.env.DATABASE_URL ?? "file:./dev.db"
});

// Opretter Prisma Client med SQLite adapteren
export const prisma = new PrismaClient({ adapter });

// Opretter Express appen
const app = express();

// Middleware som gør det muligt at modtage JSON data
app.use(express.json());