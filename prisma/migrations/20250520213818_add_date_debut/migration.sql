/*
  Warnings:

  - Added the required column `dateDebut` to the `t_promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `t_promotion` ADD COLUMN `dateDebut` DATETIME(3) NOT NULL;
