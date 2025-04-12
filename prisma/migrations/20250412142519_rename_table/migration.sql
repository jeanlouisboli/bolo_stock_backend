/*
  Warnings:

  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrdersProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- DropForeignKey
ALTER TABLE `OrdersProduct` DROP FOREIGN KEY `OrdersProduct_ordersId_fkey`;

-- DropForeignKey
ALTER TABLE `OrdersProduct` DROP FOREIGN KEY `OrdersProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_shopId_fkey`;

-- DropForeignKey
ALTER TABLE `Shop` DROP FOREIGN KEY `Shop_userId_fkey`;

-- DropTable
DROP TABLE `Orders`;

-- DropTable
DROP TABLE `OrdersProduct`;

-- DropTable
DROP TABLE `Product`;

-- DropTable
DROP TABLE `Shop`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `t_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('CLIENT', 'ENTREPRISE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `shopId` INTEGER NOT NULL,
    `dateExpire` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_shop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(191) NOT NULL,
    `Pays` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `quantite` INTEGER NOT NULL,
    `prix` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_orders_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `ordersId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_product` ADD CONSTRAINT `t_product_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `t_shop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_shop` ADD CONSTRAINT `t_shop_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `t_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_orders` ADD CONSTRAINT `t_orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `t_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_orders_product` ADD CONSTRAINT `t_orders_product_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `t_product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_orders_product` ADD CONSTRAINT `t_orders_product_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `t_orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
