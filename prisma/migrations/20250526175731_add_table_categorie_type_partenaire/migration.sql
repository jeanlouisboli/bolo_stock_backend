/*
  Warnings:

  - You are about to drop the column `type_commerce` on the `t_partenaire` table. All the data in the column will be lost.
  - You are about to drop the column `categorie` on the `t_product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `t_partenaire` DROP COLUMN `type_commerce`,
    ADD COLUMN `typePartenaireId` INTEGER NULL;

-- AlterTable
ALTER TABLE `t_product` DROP COLUMN `categorie`,
    ADD COLUMN `categorieId` INTEGER NULL;

-- CreateTable
CREATE TABLE `t_type_partenaire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_categorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_partenaire` ADD CONSTRAINT `t_partenaire_typePartenaireId_fkey` FOREIGN KEY (`typePartenaireId`) REFERENCES `t_type_partenaire`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_product` ADD CONSTRAINT `t_product_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `t_categorie`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
