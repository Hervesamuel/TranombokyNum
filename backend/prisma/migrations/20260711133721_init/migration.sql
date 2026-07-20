-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'LECTEUR', 'AUTEUR');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "iduser" SERIAL NOT NULL,
    "nomcomplet" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mdp" TEXT NOT NULL,
    "photo" TEXT,
    "genre" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'LECTEUR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("iduser")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");
