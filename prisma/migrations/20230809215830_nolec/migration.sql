/*
  Warnings:

  - You are about to drop the column `videos` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Lecture` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "videos";

-- DropTable
DROP TABLE "Lecture";

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "lectureName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Video_courseId_idx" ON "Video"("courseId");
