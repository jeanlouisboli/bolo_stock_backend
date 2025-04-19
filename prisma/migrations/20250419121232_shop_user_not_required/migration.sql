-- DropForeignKey
ALTER TABLE `t_shop` DROP FOREIGN KEY `t_shop_userId_fkey`;

-- DropIndex
DROP INDEX `t_shop_userId_fkey` ON `t_shop`;

-- AlterTable
ALTER TABLE `t_shop` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `t_shop` ADD CONSTRAINT `t_shop_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `t_user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
