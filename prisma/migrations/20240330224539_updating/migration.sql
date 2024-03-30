/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);
