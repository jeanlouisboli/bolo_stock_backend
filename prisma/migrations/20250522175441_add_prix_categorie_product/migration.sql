/*
  Warnings:

  - You are about to drop the column `categorie` on the `t_promotion` table. All the data in the column will be lost.
  - You are about to drop the column `prix` on the `t_promotion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `t_product` ADD COLUMN `categorie` VARCHAR(191) NULL,
    ADD COLUMN `prix` INTEGER NULL;

-- AlterTable
ALTER TABLE `t_promotion` DROP COLUMN `categorie`,
    DROP COLUMN `prix`;
