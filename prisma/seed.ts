import "dotenv/config";
import bcrypt from "bcrypt";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db"
});
const prisma = new PrismaClient({ adapter });

const dataDir = path.join(import.meta.dirname, "data");

const readCsv = <T = any>(filename: string): T[] => {
  const file = readFileSync(path.join(dataDir, filename));
  return parse(file, {
    columns: true,
    skip_empty_lines: true,
    cast: true,
    trim: true
  }) as T[];
};

const main = async () => {
  const csvFiles = readdirSync(dataDir).filter(f => f.endsWith(".csv"));
  console.log("Found CSV files:", csvFiles);

  await prisma.cars.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.fueltypes.deleteMany();
  await prisma.user.deleteMany();

  if (csvFiles.includes("user.csv")) {
    const users = readCsv<any>("user.csv");
    for (const u of users) {
      u.password = await bcrypt.hash(u.password, 10);
      await prisma.user.create({ data: u });
    }
    console.log("Seeded user.csv");
  }

  if (csvFiles.includes("fueltypes.csv")) {
    await prisma.fueltypes.createMany({ data: readCsv("fueltypes.csv") });
    console.log("Seeded fueltypes.csv");
  }

  const categoryMap = new Map<string, number>();
  if (csvFiles.includes("categories.csv")) {
    const rows = readCsv<{ name: string }>("categories.csv");
    for (const r of rows) {
      const c = await prisma.category.create({ data: r });
      categoryMap.set(c.name, c.id);
    }
    console.log("Seeded categories.csv");
  }

  const brandMap = new Map<string, number>();
  if (csvFiles.includes("brands.csv")) {
    const rows = readCsv<{ name: string; logo: string }>("brands.csv");
    for (const r of rows) {
      const b = await prisma.brand.create({ data: r });
      brandMap.set(b.name, b.id);
    }
    console.log("Seeded brands.csv");
  }

  if (csvFiles.includes("cars.csv")) {
    const rows = readCsv<any>("cars.csv");
    await prisma.cars.createMany({
      data: rows.map(r => ({
        brandId: brandMap.get(r.brand)!,
        categoryId: categoryMap.get(r.category)!,
        model: r.model,
        year: r.year,
        price: r.price,
        fueltype: r.fueltype,
        daCreated: new Date()
      }))
    });
    console.log("Seeded cars.csv");
  }
};

main()
  .then(() => {
    console.log("Seed complete");
    return prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });