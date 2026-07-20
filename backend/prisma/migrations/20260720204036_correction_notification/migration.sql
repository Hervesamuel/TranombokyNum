/*
  Warnings:

  - You are about to drop the column `utilisateurIduser` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `iduser` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_utilisateurIduser_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "utilisateurIduser",
ADD COLUMN     "iduser" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "Utilisateur"("iduser") ON DELETE RESTRICT ON UPDATE CASCADE;
