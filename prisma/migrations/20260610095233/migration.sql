/*
  Warnings:

  - You are about to drop the column `brand` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `cars` table. All the data in the column will be lost.
  - Added the required column `brandId` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cars" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "fueltype" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "cars_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cars_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_cars" ("fueltype", "id", "model", "price", "year") SELECT "fueltype", "id", "model", "price", "year" FROM "cars";
DROP TABLE "cars";
ALTER TABLE "new_cars" RENAME TO "cars";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
