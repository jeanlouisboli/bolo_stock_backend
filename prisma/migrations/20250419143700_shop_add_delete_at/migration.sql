-- AlterTable
ALTER TABLE `t_product` ADD COLUMN `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `t_shop` ADD COLUMN `deleteAt` DATETIME(3) NULL;
