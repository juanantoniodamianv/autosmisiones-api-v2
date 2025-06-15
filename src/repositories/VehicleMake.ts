import { BaseRepository, prisma } from "./base";
import { Prisma } from "@prisma/client";

class VehicleMakeRepository extends BaseRepository<
  Prisma.VehicleMakeGetPayload<{
    include: {
      vehicleCategory: true;
      vehicleModels: true;
    };
  }>
> {
  constructor() {
    super("vehicleMake");
  }

  async findAll(where?: any) {
    return await prisma.vehicleMake.findMany({
      where,
      include: {
        vehicleCategory: true,
        vehicleModels: true,
      },
    });
  }

  async findById(id: number) {
    return await prisma.vehicleMake.findUnique({
      where: { id },
      include: {
        vehicleCategory: true,
        vehicleModels: true,
      },
    });
  }
}

export { VehicleMakeRepository };
