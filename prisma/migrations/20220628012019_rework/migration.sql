/*
  Warnings:

  - Made the column `user_id` on table `Performance` required. This step will fail if there are existing NULL values in that column.

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
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Performance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Performance" ("date", "duration", "errors", "game", "id", "time", "type", "user_id", "value") SELECT "date", "duration", "errors", "game", "id", "time", "type", "user_id", "value" FROM "Performance";
DROP TABLE "Performance";
ALTER TABLE "new_Performance" RENAME TO "Performance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
