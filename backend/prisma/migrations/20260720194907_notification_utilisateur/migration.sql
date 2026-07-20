/*
  Warnings:

  - You are about to drop the column `iduser` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_iduser_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "iduser",
ADD COLUMN     "auteurIdaut" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "utilisateurIduser" INTEGER;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_auteurIdaut_fkey" FOREIGN KEY ("auteurIdaut") REFERENCES "Auteur"("idaut") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_utilisateurIduser_fkey" FOREIGN KEY ("utilisateurIduser") REFERENCES "Utilisateur"("iduser") ON DELETE SET NULL ON UPDATE CASCADE;
