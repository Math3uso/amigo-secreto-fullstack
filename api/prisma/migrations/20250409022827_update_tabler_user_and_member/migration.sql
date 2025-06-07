/*
  Warnings:

  - You are about to drop the column `admin_id` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `member_id` on the `Group` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_member_id_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "admin_id",
DROP COLUMN "member_id";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "groupId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
