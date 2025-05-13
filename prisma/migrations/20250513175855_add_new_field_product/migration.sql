/*
  Warnings:

  - Added the required column `categorie` to the `t_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `t_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prixPromo` to the `t_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remise` to the `t_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seuil` to the `t_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `t_product` ADD COLUMN `categorie` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `prixPromo` INTEGER NOT NULL,
    ADD COLUMN `remise` INTEGER NOT NULL,
    ADD COLUMN `seuil` INTEGER NOT NULL;
