/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `t_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `t_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `t_user_username_key` ON `t_user`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `t_user_email_key` ON `t_user`(`email`);
