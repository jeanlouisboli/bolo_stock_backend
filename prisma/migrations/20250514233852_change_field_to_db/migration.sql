/*
  Warnings:

  - You are about to drop the column `productId` on the `t_orders` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `t_orders` table. All the data in the column will be lost.
  - You are about to drop the column `categorie` on the `t_product` table. All the data in the column will be lost.
  - You are about to drop the column `dateExpire` on the `t_product` table. All the data in the column will be lost.
  - You are about to drop the column `prix` on the `t_product` table. All the data in the column will be lost.
  - You are about to drop the column `prixPromo` on the `t_product` table. All the data in the column will be lost.
  - You are about to drop the column `remise` on the `t_product` table. All the data in the column will be lost.
  - You are about to drop the column `seuil` on the `t_product` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `t_product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `t_product` table. All the data in the column will be lost.
  - You are about to drop the `t_shop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `t_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `promotionId` to the `t_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partenaireId` to the `t_product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `t_orders` DROP FOREIGN KEY `t_orders_productId_fkey`;

-- DropForeignKey
ALTER TABLE `t_orders` DROP FOREIGN KEY `t_orders_userId_fkey`;

-- DropForeignKey
ALTER TABLE `t_product` DROP FOREIGN KEY `t_product_shopId_fkey`;

-- DropForeignKey
ALTER TABLE `t_shop` DROP FOREIGN KEY `t_shop_userId_fkey`;

-- DropIndex
DROP INDEX `t_orders_productId_fkey` ON `t_orders`;

-- DropIndex
DROP INDEX `t_orders_userId_fkey` ON `t_orders`;

-- DropIndex
DROP INDEX `t_product_shopId_fkey` ON `t_product`;

-- AlterTable
ALTER TABLE `t_orders` DROP COLUMN `productId`,
    DROP COLUMN `userId`,
    ADD COLUMN `promotionId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `t_product` DROP COLUMN `categorie`,
    DROP COLUMN `dateExpire`,
    DROP COLUMN `prix`,
    DROP COLUMN `prixPromo`,
    DROP COLUMN `remise`,
    DROP COLUMN `seuil`,
    DROP COLUMN `shopId`,
    DROP COLUMN `stock`,
    ADD COLUMN `partenaireId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `t_shop`;

-- DropTable
DROP TABLE `t_user`;

-- CreateTable
CREATE TABLE `t_partenaire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type_commerce` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `pays` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `t_partenaire_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_promotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categorie` VARCHAR(191) NOT NULL,
    `prix` INTEGER NOT NULL,
    `prixPromo` INTEGER NOT NULL,
    `remise` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `seuil` INTEGER NOT NULL,
    `partenaireId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `dateExpire` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_product` ADD CONSTRAINT `t_product_partenaireId_fkey` FOREIGN KEY (`partenaireId`) REFERENCES `t_partenaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_promotion` ADD CONSTRAINT `t_promotion_partenaireId_fkey` FOREIGN KEY (`partenaireId`) REFERENCES `t_partenaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_promotion` ADD CONSTRAINT `t_promotion_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `t_product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_orders` ADD CONSTRAINT `t_orders_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `t_promotion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
