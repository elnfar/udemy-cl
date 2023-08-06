/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "videos" TEXT[];

-- DropTable
DROP TABLE "Images";

-- DropTable
DROP TABLE "Video";
