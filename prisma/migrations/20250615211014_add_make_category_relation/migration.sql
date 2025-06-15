/*
  Warnings:

  - You are about to drop the `_VehicleCategoryToVehicleMake` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `vehicleCategoryId` to the `VehicleMake` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_VehicleCategoryToVehicleMake" DROP CONSTRAINT "_VehicleCategoryToVehicleMake_A_fkey";

-- DropForeignKey
ALTER TABLE "_VehicleCategoryToVehicleMake" DROP CONSTRAINT "_VehicleCategoryToVehicleMake_B_fkey";

-- AlterTable
ALTER TABLE "VehicleMake" ADD COLUMN     "vehicleCategoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_VehicleCategoryToVehicleMake";

-- AddForeignKey
ALTER TABLE "VehicleMake" ADD CONSTRAINT "VehicleMake_vehicleCategoryId_fkey" FOREIGN KEY ("vehicleCategoryId") REFERENCES "VehicleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
