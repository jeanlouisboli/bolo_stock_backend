/*
  Warnings:

  - You are about to drop the column `deleteAt` on the `t_product` table. All the data in the column will be lost.
  - You are about to drop the column `deleteAt` on the `t_shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `t_orders` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `t_product` DROP COLUMN `deleteAt`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `t_shop` DROP COLUMN `deleteAt`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;
