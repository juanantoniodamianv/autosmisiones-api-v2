
ALTER TABLE "vehicleMake"
ADD CONSTRAINT "unique_vehicleMake_name" UNIQUE ("name");

ALTER TABLE "vehicleModel"
ADD CONSTRAINT "unique_vehicleModel_make_name"
UNIQUE ("name", "vehicleMakeId");

ALTER TABLE "vehicleVersion"
ADD CONSTRAINT "unique_vehicleVersion_model_name"
UNIQUE ("name", "vehicleModelId");
