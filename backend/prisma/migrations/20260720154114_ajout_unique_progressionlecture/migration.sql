/*
  Warnings:

  - A unique constraint covering the columns `[iduser,idlivre]` on the table `Progressionlecture` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Progressionlecture_iduser_idlivre_key" ON "Progressionlecture"("iduser", "idlivre");
