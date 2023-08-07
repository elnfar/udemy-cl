/*
  Warnings:

  - You are about to drop the column `videos` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "videos";

-- CreateTable
CREATE TABLE "Lecture" (
    "id" TEXT NOT NULL,
    "videos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lecture_courseId_idx" ON "Lecture"("courseId");
