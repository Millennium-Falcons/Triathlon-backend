/*
  Warnings:

  - You are about to alter the column `Total_cost` on the `bookingtbl` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `bookingtbl` MODIFY `Total_cost` DECIMAL(65, 30) NOT NULL;
