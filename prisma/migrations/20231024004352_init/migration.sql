/*
  Warnings:

  - You are about to drop the column `dataNascimento` on the `cliente` table. All the data in the column will be lost.
  - Added the required column `data_nascimento` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `dataNascimento`,
    ADD COLUMN `data_nascimento` DATETIME(3) NOT NULL;
