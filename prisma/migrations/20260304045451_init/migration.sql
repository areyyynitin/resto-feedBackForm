-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "restaurantRating" INTEGER NOT NULL,
    "restaurantNote" TEXT,
    "foodRating" INTEGER NOT NULL,
    "foodNote" TEXT,
    "serviceRating" INTEGER NOT NULL,
    "serviceNote" TEXT,
    "ambienceRating" INTEGER NOT NULL,
    "ambienceNote" TEXT,
    "orderedFood" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
