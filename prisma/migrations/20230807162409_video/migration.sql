/*
  Warnings:

  - You are about to drop the column `videos` on the `Lecture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "videos",
ADD COLUMN     "lecture" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LectureToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LectureToVideo_AB_unique" ON "_LectureToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_LectureToVideo_B_index" ON "_LectureToVideo"("B");
