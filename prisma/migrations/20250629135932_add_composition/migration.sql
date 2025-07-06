-- CreateTable
CREATE TABLE "composition" (
    "id" SERIAL NOT NULL,
    "original" TEXT NOT NULL,
    "corrected" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "language" "language" NOT NULL,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "composition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "composition" ADD CONSTRAINT "composition_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
