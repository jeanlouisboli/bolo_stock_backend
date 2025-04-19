/*
  Warnings:

  - You are about to drop the column `Pays` on the `t_shop` table. All the data in the column will be lost.
  - Added the required column `pays` to the `t_shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `t_shop` DROP COLUMN `Pays`,
    ADD COLUMN `pays` VARCHAR(191) NOT NULL;
