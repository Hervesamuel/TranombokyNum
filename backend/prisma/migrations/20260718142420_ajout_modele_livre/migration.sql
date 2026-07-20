/*
  Warnings:

  - Added the required column `langue` to the `Livre` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatutLivre" AS ENUM ('EN_ATTENTE', 'VALIDE', 'REFUSE');

-- AlterTable
ALTER TABLE "Livre" ADD COLUMN     "couverture" TEXT,
ADD COLUMN     "fichierPdf" TEXT,
ADD COLUMN     "langue" TEXT NOT NULL,
ADD COLUMN     "resume" TEXT,
ADD COLUMN     "statut" "StatutLivre" NOT NULL DEFAULT 'EN_ATTENTE';
