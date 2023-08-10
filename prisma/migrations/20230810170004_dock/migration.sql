/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "videos" TEXT[];

-- DropTable
DROP TABLE "Video";
