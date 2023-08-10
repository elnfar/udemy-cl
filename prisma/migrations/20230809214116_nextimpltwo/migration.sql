/*
  Warnings:

  - You are about to drop the column `title` on the `Lecture` table. All the data in the column will be lost.
  - Added the required column `lectureTitle` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "title",
ADD COLUMN     "lectureTitle" TEXT NOT NULL;
