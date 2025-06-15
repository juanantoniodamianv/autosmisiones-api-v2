import { BaseRepository, prisma } from "./base";
import { Prisma } from "@prisma/client";

class VehicleModelRepository extends BaseRepository<
  Prisma.VehicleModelGetPayload<{
    include: {
      vehicleMake: true;
      vehicleVersions: true;
    };
  }>
> {
  constructor() {
    super("vehicleModel");
  }

  async findAll(where?: any) {
    return await prisma.vehicleModel.findMany({
      where,
      include: {
        vehicleMake: true,
        vehicleVersions: true,
      },
    });
  }

  async findById(id: number) {
    return await prisma.vehicleModel.findUnique({
      where: { id },
      include: {
        vehicleMake: true,
        vehicleVersions: true,
      },
    });
  }
}

export { VehicleModelRepository };
