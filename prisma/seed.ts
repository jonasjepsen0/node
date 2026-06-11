import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import {
  userData,
  fueltypesData,
  categoriesData,
  brandsData,
  carsData
} from "./seedData.ts";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db"
});

const prisma = new PrismaClient({ adapter });

const main = async () => {
  await prisma.cars.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.fueltypes.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      ...userData,
      password: await bcrypt.hash(userData.password, 10)
    }
  });
  console.log("Seed completed for users");

  await prisma.fueltypes.createMany({ data: fueltypesData });
  console.log("Seed completed for fueltypes");

  const categories = await Promise.all(
    categoriesData.map(c => prisma.category.create({ data: c }))
  );
  console.log("Seed completed for categories");

  const brands = await Promise.all(
    brandsData.map(b => prisma.brand.create({ data: b }))
  );
  console.log("Seed completed for brands");

  const brandMap = Object.fromEntries(brands.map(b => [b.name, b.id]));
  const categoryMap = Object.fromEntries(categories.map(c => [c.name, c.id]));

  await prisma.cars.createMany({
    data: carsData.map(c => ({
      brandId: brandMap[c.brand],
      categoryId: categoryMap[c.category],
      model: c.model,
      year: c.year,
      price: c.price,
      fueltype: c.fueltype,
      daCreated: new Date()
    }))
  });
  console.log("Seed completed for cars");
};

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });