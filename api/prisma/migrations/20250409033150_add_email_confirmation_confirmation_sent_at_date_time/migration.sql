/*
  Warnings:

  - Added the required column `confirmation_sent_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_confirmation` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmation_sent_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email_confirmation" BOOLEAN NOT NULL;
