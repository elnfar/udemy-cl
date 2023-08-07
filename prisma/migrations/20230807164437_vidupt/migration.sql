/*
  Warnings:

  - You are about to drop the `Lecture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LectureToVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "videos" TEXT[];

-- DropTable
DROP TABLE "Lecture";

-- DropTable
DROP TABLE "Video";

-- DropTable
DROP TABLE "_LectureToVideo";
