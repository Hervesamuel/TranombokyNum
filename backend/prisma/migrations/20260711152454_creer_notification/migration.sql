-- CreateTable
CREATE TABLE "Historique" (
    "idhistorique" SERIAL NOT NULL,
    "iduser" INTEGER NOT NULL,
    "idlivre" INTEGER NOT NULL,
    "datelecture" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Historique_pkey" PRIMARY KEY ("idhistorique")
);

-- CreateTable
CREATE TABLE "Notification" (
    "idnotification" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "datecreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estLu" BOOLEAN NOT NULL DEFAULT false,
    "iduser" INTEGER NOT NULL,
    "idlivre" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("idnotification")
);

-- AddForeignKey
ALTER TABLE "Historique" ADD CONSTRAINT "Historique_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "Utilisateur"("iduser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historique" ADD CONSTRAINT "Historique_idlivre_fkey" FOREIGN KEY ("idlivre") REFERENCES "Livre"("idlivre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "Utilisateur"("iduser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_idlivre_fkey" FOREIGN KEY ("idlivre") REFERENCES "Livre"("idlivre") ON DELETE SET NULL ON UPDATE CASCADE;
