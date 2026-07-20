-- CreateTable
CREATE TABLE "Auteur" (
    "idaut" SERIAL NOT NULL,
    "nomcomplet" TEXT NOT NULL,
    "surnom" TEXT,
    "datenaissance" TIMESTAMP(3) NOT NULL,
    "datedece" TIMESTAMP(3),
    "adresse" TEXT NOT NULL,
    "biographie" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auteur_pkey" PRIMARY KEY ("idaut")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auteur_email_key" ON "Auteur"("email");
