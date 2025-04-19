/*
  Warnings:

  - You are about to drop the column `name` on the `t_user` table. All the data in the column will be lost.
  - You are about to drop the `t_orders_product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `t_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomClient` to the `t_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroTelephone` to the `t_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `t_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prix` to the `t_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `t_shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `t_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `t_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `t_orders_product` DROP FOREIGN KEY `t_orders_product_ordersId_fkey`;

-- DropForeignKey
ALTER TABLE `t_orders_product` DROP FOREIGN KEY `t_orders_product_productId_fkey`;

-- AlterTable
ALTER TABLE `t_orders` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `nomClient` VARCHAR(191) NOT NULL,
    ADD COLUMN `numeroTelephone` VARCHAR(191) NOT NULL,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `t_product` ADD COLUMN `prix` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `t_shop` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `t_user` DROP COLUMN `name`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `t_orders_product`;

-- AddForeignKey
ALTER TABLE `t_orders` ADD CONSTRAINT `t_orders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `t_product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
