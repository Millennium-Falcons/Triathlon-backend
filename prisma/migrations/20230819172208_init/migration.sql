/*
  Warnings:

  - You are about to drop the column `location` on the `passenger` table. All the data in the column will be lost.
  - Added the required column `address` to the `Passenger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `passenger` DROP COLUMN `location`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;
