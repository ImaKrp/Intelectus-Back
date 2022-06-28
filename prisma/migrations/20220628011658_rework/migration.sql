/*
  Warnings:

  - You are about to drop the column `userId` on the `Performance` table. All the data in the column will be lost.
  - Added the required column `game` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Performance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Performance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "errors" INTEGER NOT NULL,
    "duration" REAL NOT NULL,
    "game" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "user_id" INTEGER,
    CONSTRAINT "Performance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Performance" ("date", "duration", "errors", "id", "value") SELECT "date", "duration", "errors", "id", "value" FROM "Performance";
DROP TABLE "Performance";
ALTER TABLE "new_Performance" RENAME TO "Performance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
