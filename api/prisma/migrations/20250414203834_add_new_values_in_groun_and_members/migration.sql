/*
  Warnings:

  - You are about to drop the column `passeord` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[group_id]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_value` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_value` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "max_value" INTEGER NOT NULL,
ADD COLUMN     "min_value" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "user_select_id" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passeord",
DROP COLUMN "session_id",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "refreash_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_group_id_key" ON "Invitation"("group_id");
