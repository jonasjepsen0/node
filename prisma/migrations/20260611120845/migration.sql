-- CreateTable
CREATE TABLE "fueltypes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "fueltypes_name_key" ON "fueltypes"("name");
