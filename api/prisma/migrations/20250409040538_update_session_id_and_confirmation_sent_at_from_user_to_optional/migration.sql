-- AlterTable
ALTER TABLE "User" ALTER COLUMN "confirmation_sent_at" DROP NOT NULL,
ALTER COLUMN "session_id" DROP NOT NULL;
