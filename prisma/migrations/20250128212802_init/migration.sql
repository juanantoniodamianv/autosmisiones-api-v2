-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicationMediaResource" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "publicationId" INTEGER NOT NULL,

    CONSTRAINT "PublicationMediaResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "previousPrice" DOUBLE PRECISION,
    "currencyType" TEXT NOT NULL DEFAULT '$',
    "condition" TEXT NOT NULL,
    "year" INTEGER,
    "km" INTEGER,
    "color" TEXT,
    "neighborhood" TEXT,
    "transmission" TEXT,
    "engine" TEXT,
    "fuelType" TEXT,
    "doors" TEXT,
    "uniqueOwner" BOOLEAN NOT NULL DEFAULT false,
    "slugUrl" TEXT NOT NULL,
    "swap" BOOLEAN NOT NULL DEFAULT false,
    "ownerPhone" TEXT,
    "marketDiscount" BOOLEAN NOT NULL DEFAULT false,
    "personId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "vehicleCategoryId" INTEGER,
    "vehicleModelId" INTEGER,
    "vehicleMakeId" INTEGER,
    "vehicleVersionId" INTEGER,
    "vehicleCustomDataId" INTEGER,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'wp',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedToken" TEXT,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonMediaResource" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "imageType" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "PersonMediaResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "maxPublications" INTEGER NOT NULL DEFAULT 3,
    "openingHours" TEXT,
    "locationStreet" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "provinceId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleVersion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "vehicleModelId" INTEGER NOT NULL,

    CONSTRAINT "VehicleVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VehicleCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "vehicleMakeId" INTEGER NOT NULL,

    CONSTRAINT "VehicleModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleMake" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VehicleMake_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Publication_slugUrl_key" ON "Publication"("slugUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Province_name_key" ON "Province"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleMake_name_key" ON "VehicleMake"("name");

-- AddForeignKey
ALTER TABLE "PublicationMediaResource" ADD CONSTRAINT "PublicationMediaResource_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_vehicleCategoryId_fkey" FOREIGN KEY ("vehicleCategoryId") REFERENCES "VehicleCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_vehicleModelId_fkey" FOREIGN KEY ("vehicleModelId") REFERENCES "VehicleModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_vehicleMakeId_fkey" FOREIGN KEY ("vehicleMakeId") REFERENCES "VehicleMake"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_vehicleVersionId_fkey" FOREIGN KEY ("vehicleVersionId") REFERENCES "VehicleVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonMediaResource" ADD CONSTRAINT "PersonMediaResource_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleVersion" ADD CONSTRAINT "VehicleVersion_vehicleModelId_fkey" FOREIGN KEY ("vehicleModelId") REFERENCES "VehicleModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleModel" ADD CONSTRAINT "VehicleModel_vehicleMakeId_fkey" FOREIGN KEY ("vehicleMakeId") REFERENCES "VehicleMake"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
