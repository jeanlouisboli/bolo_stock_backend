/*
  Warnings:

  - You are about to drop the column `email` on the `t_orders` table. All the data in the column will be lost.
  - You are about to drop the column `nomClient` on the `t_orders` table. All the data in the column will be lost.
  - You are about to drop the column `numeroTelephone` on the `t_orders` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `t_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `t_orders` DROP COLUMN `email`,
    DROP COLUMN `nomClient`,
    DROP COLUMN `numeroTelephone`,
    ADD COLUMN `clientId` INTEGER NOT NULL,
    ADD COLUMN `montant` DOUBLE NULL;

-- AlterTable
ALTER TABLE `t_partenaire` ADD COLUMN `approved` BOOLEAN NULL,
    ADD COLUMN `venteTotal` DOUBLE NULL;

-- CreateTable
CREATE TABLE `t_client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomClient` VARCHAR(191) NOT NULL,
    `numeroTelephone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_orders` ADD CONSTRAINT `t_orders_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `t_client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
