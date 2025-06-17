-- CreateTable
CREATE TABLE "_VehicleCategoryToVehicleMake" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VehicleCategoryToVehicleMake_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VehicleCategoryToVehicleMake_B_index" ON "_VehicleCategoryToVehicleMake"("B");

-- AddForeignKey
ALTER TABLE "_VehicleCategoryToVehicleMake" ADD CONSTRAINT "_VehicleCategoryToVehicleMake_A_fkey" FOREIGN KEY ("A") REFERENCES "VehicleCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleCategoryToVehicleMake" ADD CONSTRAINT "_VehicleCategoryToVehicleMake_B_fkey" FOREIGN KEY ("B") REFERENCES "VehicleMake"("id") ON DELETE CASCADE ON UPDATE CASCADE;
