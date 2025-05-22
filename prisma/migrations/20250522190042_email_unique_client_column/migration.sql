/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `t_client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `t_client_email_key` ON `t_client`(`email`);
