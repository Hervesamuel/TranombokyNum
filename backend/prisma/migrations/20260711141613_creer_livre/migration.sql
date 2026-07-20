-- CreateTable
CREATE TABLE "Livre" (
    "idlivre" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "nbrpage" INTEGER NOT NULL,
    "datepub" TIMESTAMP(3) NOT NULL,
    "categorie" TEXT NOT NULL,
    "idaut" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Livre_pkey" PRIMARY KEY ("idlivre")
);

-- AddForeignKey
ALTER TABLE "Livre" ADD CONSTRAINT "Livre_idaut_fkey" FOREIGN KEY ("idaut") REFERENCES "Auteur"("idaut") ON DELETE RESTRICT ON UPDATE CASCADE;
