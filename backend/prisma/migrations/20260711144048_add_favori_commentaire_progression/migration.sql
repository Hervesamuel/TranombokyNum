-- CreateTable
CREATE TABLE "Favoris" (
    "idfavoris" SERIAL NOT NULL,
    "iduser" INTEGER NOT NULL,
    "idlivre" INTEGER NOT NULL,
    "dateajout" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favoris_pkey" PRIMARY KEY ("idfavoris")
);

-- CreateTable
CREATE TABLE "Commentaire" (
    "idcom" SERIAL NOT NULL,
    "contenu" TEXT NOT NULL,
    "datecom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "iduser" INTEGER NOT NULL,
    "idlivre" INTEGER NOT NULL,

    CONSTRAINT "Commentaire_pkey" PRIMARY KEY ("idcom")
);

-- CreateTable
CREATE TABLE "Progressionlecture" (
    "idprogression" SERIAL NOT NULL,
    "iduser" INTEGER NOT NULL,
    "idlivre" INTEGER NOT NULL,
    "pagecourante" INTEGER NOT NULL,
    "datedernierelecture" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Progressionlecture_pkey" PRIMARY KEY ("idprogression")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favoris_iduser_idlivre_key" ON "Favoris"("iduser", "idlivre");

-- AddForeignKey
ALTER TABLE "Favoris" ADD CONSTRAINT "Favoris_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "Utilisateur"("iduser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favoris" ADD CONSTRAINT "Favoris_idlivre_fkey" FOREIGN KEY ("idlivre") REFERENCES "Livre"("idlivre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "Utilisateur"("iduser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_idlivre_fkey" FOREIGN KEY ("idlivre") REFERENCES "Livre"("idlivre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progressionlecture" ADD CONSTRAINT "Progressionlecture_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "Utilisateur"("iduser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progressionlecture" ADD CONSTRAINT "Progressionlecture_idlivre_fkey" FOREIGN KEY ("idlivre") REFERENCES "Livre"("idlivre") ON DELETE RESTRICT ON UPDATE CASCADE;
